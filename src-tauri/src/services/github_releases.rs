use reqwest::blocking::{Client, Response};
use std::{fs::File, io::Write, path::PathBuf};

use crate::domain::utils::get_download_dir;

pub fn download_current_template() -> Result<PathBuf, String> {
    let client: Client = Client::new(); // Create the https client
    let url: &str = crate::domain::constants::GITHUB_RELEASE; // Point to github releases

    // Get the response calling the url
    let response: Response = client.get(url).send().map_err(|e| e.to_string())?;
    if !response.status().is_success() {
        return Err(format!("HTTP {}", response.status()));
    }
    // Get the download path using a function
    let download_path = get_download_dir().ok_or("Error getting the download folder")?;
    let mut full_path = download_path;
    full_path.push(format!(
        "{}.zip",
        crate::domain::constants::CURRENT_TEMPLATE_NAME
    ));
    // Create the file
    let mut file = File::create(&full_path).map_err(|e| e.to_string())?;
    // Write the bytes on the file created before
    let bytes = response.bytes().map_err(|e| e.to_string())?;
    file.write_all(&bytes).map_err(|e| e.to_string())?;

    Ok(full_path) // Return the full path of the basic template
}
