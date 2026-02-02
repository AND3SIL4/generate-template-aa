use std::{fs, path::Path};

use regex::Regex;
use walkdir::WalkDir;

use crate::infra::{filesystem::collect_renames, replacer::replace_in_file_content};

pub fn basic_scaffold(
    folder_path: &Path,
    new_name: &str,
    current_template_name: &str,
) -> (bool, Vec<String>, usize) {
    let re = match Regex::new(current_template_name) {
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

pub fn scaffold_with_phases() {}
