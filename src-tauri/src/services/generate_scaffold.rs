use std::{fs, path::Path};

use regex::Regex;
use walkdir::WalkDir;

use crate::domain::constants::{AUTOMATION_PATH, BOT_PATH};
use crate::infra::filesystem::{copy_folder_content, move_folder};
use crate::infra::{filesystem::collect_renames, replacer::replace_in_file_content};

pub fn basic_scaffold(
    folder_path: &Path,
    new_name: &str,
    current_template_name: &str,
) -> (bool, Vec<String>, usize) {
    let re = match Regex::new(&current_template_name) {
        Ok(regex) => regex,
        Err(e) => {
            return (false, vec![format!("Invalid regex: {}", e)], 0);
        }
    };

    let mut messages: Vec<String> = Vec::new();
    let mut total_matches = 0;
    let mut success = false;

    // Recollect all renames
    let renames = collect_renames(folder_path, &re, new_name);

    // Replace content in files
    for entry in WalkDir::new(folder_path).into_iter().filter_map(|e| e.ok()) {
        if !entry.file_type().is_file() {
            // Continue if is not a file
            continue;
        }

        match replace_in_file_content(entry.path(), &re, new_name) {
            Ok(Some(count)) => {
                total_matches += count;
                if count > 0 {
                    messages.push(format!(
                        "Updted content in: {} ({} matchec)",
                        entry.path().display(),
                        count
                    ));
                }
            }
            Ok(None) => {}
            Err(e) => {
                success = false;
                messages.push(format!("Failed {}: {}", entry.path().display(), e));
            }
        }
    }

    // Execute renames from down to top
    for (old_path, new_path) in renames {
        let matches = re
            .find_iter(old_path.file_name().unwrap().to_str().unwrap_or(""))
            .count();
        total_matches += matches;

        match fs::rename(&old_path, &new_path) {
            Ok(_) => {
                messages.push(format!(
                    "Renamed {} -> {} ({} matches)",
                    old_path.display(),
                    new_path.display(),
                    matches
                ));
            }
            Err(error) => {
                success = false;
                messages.push(format!("Failed rename {}: {}", old_path.display(), error));
            }
        }
    }

    (success, messages, total_matches)
}

pub fn scaffold_with_phases(
    folder_path: &Path,
    project_name: &str,
    current_template_name: &str,
    phases: &Vec<String>,
) -> Result<usize, String> {
    let mut total_matches = 0;

    // Prepare the temp path for operations
    let mut temp_path = folder_path.to_path_buf();
    temp_path.push(AUTOMATION_PATH);
    temp_path.push(BOT_PATH);

    // Create the main project folder
    let project_folder = temp_path.join(&project_name);
    fs::create_dir_all(&project_folder)
        .map_err(|e| format!("Failed to create project folder: {}", e))?;

    for phase in phases {
        let phase_folder = temp_path.join(phase);
        let re = Regex::new(&current_template_name)
            .map_err(|e| format!("Invalid regex for template name: {}", e))?;

        // Copy template contents to phase folder
        copy_folder_content(&temp_path.join(current_template_name), &phase_folder)
            .map_err(|e| format!("Failed to copy content for phase '{}': {}", phase, e))?;

        // Collect and execute file/folder renames for this phase
        let renames = collect_renames(&phase_folder, &re, &phase);
        for (old_path, new_path) in renames {
            let matches = re
                .find_iter(old_path.file_name().and_then(|n| n.to_str()).unwrap_or(""))
                .count();
            total_matches += matches;

            fs::rename(&old_path, &new_path).map_err(|e| {
                format!(
                    "Failed to rename from '{}' to '{}': {}",
                    old_path.display(),
                    new_path.display(),
                    e
                )
            })?;
        }

        // Replace content inside files for this phase
        for entry in WalkDir::new(&phase_folder)
            .into_iter()
            .filter_map(|e| e.ok())
        {
            if !entry.file_type().is_file() {
                continue;
            }

            // Replace Unix-style path pattern "/template_name/" with "/project/phase"
            let unix_path_pattern = format!("/{}/", regex::escape(current_template_name));
            let unix_path_re = Regex::new(&unix_path_pattern)
                .map_err(|e| format!("Invalid regex for Unix path pattern: {}", e))?;
            let unix_replacement = format!("/{}/{}/", project_name, phase);

            match replace_in_file_content(entry.path(), &unix_path_re, &unix_replacement) {
                Ok(Some(count)) => total_matches += count,
                Ok(None) => {}
                Err(e) => {
                    return Err(format!(
                        "Failed to replace Unix path pattern in '{}': {}",
                        entry.path().display(),
                        e
                    ));
                }
            }
        }

        // Move the phase folder to project folder
        move_folder(&phase_folder, &project_folder.join(phase))
            .map_err(|e| format!("Failed to move phase folder '{}': {}", phase, e))?;
    }

    // Delete the template folder after creating all phases
    fs::remove_dir_all(temp_path.join(current_template_name))
        .map_err(|e| format!("Failed to remove template folder: {}", e))?;

    Ok(total_matches)
}
