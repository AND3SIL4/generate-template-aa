use std::{env::temp_dir, fs};

use crate::domain::{
    constants::TEMP_FOLDER,
    implementations::{ScaffoldData, ScaffoldResponse},
};
use crate::infra::zipper;
use crate::services::github_releases;

#[tauri::command]
pub fn generate_template(scaffold_data: ScaffoldData) -> Result<ScaffoldResponse, String> {
    // Create the temp folder path to make all activities
    let mut temp_folder = temp_dir(); // Create base directory
    temp_folder.push(TEMP_FOLDER); // Add a temp folder to isolate the activities
    fs::create_dir_all(&temp_folder).map_err(|e| e.to_string())?;

    let template_file = github_releases::download_current_template(&temp_folder)?;
    zipper::unzipfile(&template_file, &temp_folder)?; // Unzip downloaded file
    fs::remove_file(&template_file).map_err(|e| e.to_string())?; // Remove after extract all the content

    Ok(ScaffoldResponse::success("Downloads Folder".to_string()))
}
