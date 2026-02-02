use reqwest::blocking::Client;
use std::{
    fs::File,
    io::Write,
    path::{Path, PathBuf},
};

use crate::domain::constants::CURRENT_TEMPLATE_NAME;
use crate::domain::constants::GITHUB_RELEASE;

pub fn download_current_template(download_path: &Path) -> Result<PathBuf, String> {
    let client = Client::new(); // Create the https client
    let url = GITHUB_RELEASE; // Point to github releases

    // Get the response calling the url
    let response = client.get(url).send().map_err(|e| e.to_string())?;
    if !response.status().is_success() {
        return Err(format!("HTTP {}", response.status()));
    }

    // Construct the full path for the zip file
    let mut zip_path = PathBuf::from(download_path);
    zip_path.push(format!("{}.zip", CURRENT_TEMPLATE_NAME));

    // Create the file
    let mut file = File::create(&zip_path).map_err(|e| e.to_string())?;

    // Write the bytes to the created file
    let bytes = response.bytes().map_err(|e| e.to_string())?;
    file.write_all(&bytes).map_err(|e| e.to_string())?;

    Ok(zip_path) // Return the full path of the basic template
}
