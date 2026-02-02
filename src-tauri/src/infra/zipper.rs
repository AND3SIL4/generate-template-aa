use std::{fs, path::PathBuf};
use zip::ZipArchive;

pub fn unzipfile(source: &PathBuf, destination: &PathBuf) -> Result<(), String> {
    let file = fs::File::open(source)
        .map_err(|e| format!("Failed to open zip file {:?}: {}", source, e))?;
    let mut archive =
        ZipArchive::new(file).map_err(|e| format!("Failed to read zip archive: {}", e))?;
    archive
        .extract(destination)
        .map_err(|e| format!("Failed to extract zip archive: {}", e))?;
    Ok(())
}

pub fn zipfile() {}
