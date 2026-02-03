use std::{fs, path::Path};

use regex::Regex;
use walkdir::WalkDir;

use crate::domain::constants::{AUTOMATION_PATH, BOT_PATH};
use crate::domain::implementations::FileEntry;
use crate::infra::filesystem::{copy_folder_content, move_folder};
use crate::infra::json::process_manifest;
use crate::infra::{filesystem::collect_renames, replacer::replace_in_file_content};

pub fn basic_scaffold(
    folder_path: &Path,
    new_name: &str,
    current_template_name: &str,
) -> Result<usize, String> {
    let re = Regex::new(&current_template_name).map_err(|e| format!("Invalid regex: {}", e))?;

    let mut total_matches = 0;

    // Recollect all renames
    let renames = collect_renames(folder_path, &re, new_name);

    // Replace content in files
    for entry in WalkDir::new(folder_path).into_iter().filter_map(|e| e.ok()) {
        if !entry.file_type().is_file() {
            continue;
        }

        match replace_in_file_content(entry.path(), &re, new_name) {
            Ok(Some(count)) => {
                total_matches += count;
            }
            Ok(None) => {}
            Err(e) => {
                return Err(format!(
                    "Failed to update content in {}: {}",
                    entry.path().display(),
                    e
                ));
            }
        }
    }

    // Execute renames from down to top
    for (old_path, new_path) in renames {
        let matches = re
            .find_iter(old_path.file_name().unwrap().to_str().unwrap_or(""))
            .count();
        total_matches += matches;

        if let Err(error) = fs::rename(&old_path, &new_path) {
            return Err(format!(
                "Failed to rename {}: {}",
                old_path.display(),
                error
            ));
        }
    }

    Ok(total_matches)
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

    let mut entries_to_manifest: Vec<FileEntry> = vec![];

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

        // For each file in the phase_folder, replace occurrences of the template name with the phase name
        for entry in WalkDir::new(&phase_folder)
            .into_iter()
            .filter_map(|e| e.ok())
        {
            if !entry.file_type().is_file() {
                continue;
            }

            // Regex to match the plain template name (not paths, just the name)
            let template_name_re = Regex::new(&regex::escape(current_template_name))
                .map_err(|e| format!("Invalid regex for template name: {}", e))?;

            let replacement = phase.to_string();

            match replace_in_file_content(entry.path(), &template_name_re, &replacement) {
                Ok(Some(count)) => total_matches += count,
                Ok(None) => {}
                Err(e) => {
                    return Err(format!(
                        "Failed to replace template name '{}' in '{}': {}",
                        current_template_name,
                        entry.path().display(),
                        e
                    ));
                }
            }
        }

        // Move the phase folder to project folder
        move_folder(&phase_folder, &project_folder.join(phase))
            .map_err(|e| format!("Failed to move phase folder '{}': {}", phase, e))?;

        // Add the FileEntry to update the json
        // 1. Create the main reference
        entries_to_manifest.push(FileEntry::new(
            format!(
                "Automation Anywhere\\Bots\\{}\\{}\\Main_{}",
                &project_name, &phase, &phase
            ),
            "application/vnd.aa.taskbot".to_string(),
            vec![
                format!(
                    "Automation Anywhere\\Bots\\{}\\{}\\Historias\\HU00_DespliegueAmbiente",
                    &project_name, &phase
                ),
                "Automation Anywhere\\Bots\\Globales\\Config\\EscribirLog".to_string(),
            ],
            "Master de ejemplo de asistente digital".to_string(),
        ));

        // 2. Create the environment deploy file
        entries_to_manifest.push(FileEntry::new(
            format!("Automation Anywhere\\Bots\\{}\\{}\\Historias\\HU00_DespliegueAmbiente", &project_name, &phase), "application/vnd.aa.taskbot".to_string(), vec![
                 "Automation Anywhere\\Bots\\Globales\\Config\\EscribirLog".to_string(),
                "Automation Anywhere\\Bots\\Globales\\Config\\CargarArchivoParametros".to_string()
            ], "Historia de Usuario Inicial de Despliegue Ambiente, se encarga de validar que todo este OK para para ejecución del asistente digital".to_string()));

        // 3. Create the hu template
        entries_to_manifest.push(FileEntry::new(
            format!(
                "Automation Anywhere\\Bots\\{}\\{}\\Historias\\HUXX_Plantilla",
                &project_name, &phase
            ),
            "application/vnd.aa.taskbot".to_string(),
            vec![
                format!(
                    "Automation Anywhere\\Bots\\{}\\{}\\Historias\\HU00_DespliegueAmbiente",
                    &project_name, &phase
                ),
                "Automation Anywhere\\Bots\\Globales\\Config\\EscribirLog".to_string(),
            ],
            "Plantilla de Historias de Usuario".to_string(),
        ));
        // 4. Create the configuration file
        entries_to_manifest.push(FileEntry::new(
            format!(
                "Automation Anywhere\\Bots\\{}\\{}\\Parametros\\Configuracion.xlsx",
                &project_name, &phase
            ),
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet".to_string(),
            Vec::new(),
            String::new(),
        ));
        // 5. Create the template function
        entries_to_manifest.push(FileEntry::new(
            format!(
                "Automation Anywhere\\Bots\\{}\\{}\\Funciones\\00_FuncionPlantilla",
                &project_name, &phase
            ),
            "application/vnd.aa.taskbot".to_string(),
            vec![
                format!(
                    "Automation Anywhere\\Bots\\{}\\{}\\Historias\\HU00_DespliegueAmbiente",
                    &project_name, &phase
                ),
                "Automation Anywhere\\Bots\\Globales\\Config\\EscribirLog".to_string(),
            ],
            "Función empieza en verbo infinitivo, en español sin acentos".to_string(),
        ));
    }

    // Delete the template folder after creating all phases
    fs::remove_dir_all(temp_path.join(current_template_name))
        .map_err(|e| format!("Failed to remove template folder: {}", e))?;

    // Update the manifest json file
    let mut manifest_path = folder_path.to_path_buf();
    manifest_path.push("manifest.json");
    process_manifest(&manifest_path, &entries_to_manifest)?;

    Ok(total_matches)
}
