use crate::domain::implementations::ScaffoldResponse;
use crate::domain::structs::ScaffoldData;
use crate::services::github_releases;

#[tauri::command]
pub fn generate_template(scaffold_data: ScaffoldData) -> Result<ScaffoldResponse, String> {
    github_releases::download_current_template()?;

    Ok(ScaffoldResponse::success("Downloads Folder".to_string()))
}
