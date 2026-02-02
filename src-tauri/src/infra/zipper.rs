use std::{
    fs::{self, File},
    path::{Path, PathBuf},
};
use walkdir::WalkDir;
use zip::{write::SimpleFileOptions, CompressionMethod::Deflated, ZipArchive, ZipWriter};

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

pub fn zipfile(src_dir: &Path, zip_file_path: &Path) -> Result<(), String> {
    let file = File::create(zip_file_path).map_err(|e| e.to_string())?;
    let mut zip = ZipWriter::new(file);

    let options = SimpleFileOptions::default().compression_method(Deflated);

    for entry in WalkDir::new(src_dir).into_iter().filter_map(|e| e.ok()) {
        let path = entry.path();
        let name = path
            .strip_prefix(src_dir)
            .map_err(|e| e.to_string())?
            .to_string_lossy()
            .replace("\\", "/");

        if path.is_file() {
            zip.start_file(&name, options).map_err(|e| e.to_string())?;

            let mut f = File::open(path).map_err(|e| e.to_string())?;
            std::io::copy(&mut f, &mut zip).map_err(|e| e.to_string())?;
        } else {
            zip.add_directory(&name, options)
                .map_err(|e| e.to_string())?;
        }
    }

    zip.finish()
        .map_err(|e| format!("Failed to finalize zip: {}", e))?;

    Ok(()) // Return method
}
