use std::{env::temp_dir, fs, path::Path};

use directories::UserDirs;
use sqlx::{Pool, Postgres};

use crate::domain::{
    constants::{CURRENT_TEMPLATE_NAME, TEMP_FOLDER},
    implementations::{ScaffoldData, ScaffoldResponse},
};
use crate::infra::zipper;
use crate::services::{self, generate_scaffold, github_releases};

#[tauri::command]
pub async fn generate_template(scaffold_data: ScaffoldData) -> Result<ScaffoldResponse, String> {
    // Create the temp folder path to make all activities
    let mut temp_folder = temp_dir(); // Create base directory
    temp_folder.push(TEMP_FOLDER); // Add a temp folder to isolate the activities
    fs::create_dir_all(&temp_folder).map_err(|e| e.to_string())?;

    let template_file =
        github_releases::download_current_template(&temp_folder, &scaffold_data.customer).await?;
    zipper::unzipfile(&template_file, &temp_folder)?; // Unzip downloaded file
    fs::remove_file(&template_file).map_err(|e| e.to_string())?; // Remove after extract all the content

    let user_dirs = UserDirs::new().ok_or("Error getting user dirs")?;
    let final_folder = user_dirs
        .download_dir()
        .ok_or("Error finding downloads dir")?;
    let final_file = format!("{}\\{}.zip", final_folder.display(), scaffold_data.name);

    // Backend and scaffold generation logic
    // 1. Validate if the project has phases
    let total_matches;
    if scaffold_data.phases.is_empty() {
        // Call generate basic scaffold
        match generate_scaffold::basic_scaffold(
            &temp_folder,
            &scaffold_data.name,
            CURRENT_TEMPLATE_NAME,
        ) {
            Ok(tmp_total_matches) => {
                total_matches = tmp_total_matches;
            }
            Err(e) => {
                return Err(format!(
                    "Error creating template, please contact the administrator: {}",
                    e
                ));
            }
        }
    } else {
        // Call generate basic scaffold with all phases
        match generate_scaffold::scaffold_with_phases(
            &temp_folder,
            &scaffold_data.name,
            CURRENT_TEMPLATE_NAME,
            &scaffold_data.phases,
        ) {
            Ok(tmp_total_matches) => {
                total_matches = tmp_total_matches;
            }
            Err(e) => {
                return Err(format!(
                    "Error creating template with phases please contact the administrator: {}",
                    e
                ));
            }
        }
    }

    // Warp up the template creation
    zipper::zipfile(&temp_folder, Path::new(&final_file))?; // Final result
    fs::remove_dir_all(&temp_folder).map_err(|e| e.to_string())?;

    // Try to insert the record in database (Optional)
    // Insert record in database after generate template

    let pool: Pool<Postgres> = services::database::get_database_connection()
        .await
        .expect("Couldn't connect to database");

    let id_template = services::database::insert_record(scaffold_data, &pool)
        .await
        .expect("An error occurre when generate a template");

    Ok(ScaffoldResponse::success(
        &final_file,
        &total_matches,
        &id_template,
    ))
}
