use std::path::Path;

use crate::domain::implementations::FileEntry;

pub fn process_manifest(json_path: &Path, new_entries: &Vec<FileEntry>) -> Result<(), String> {
    let content = std::fs::read_to_string(json_path).map_err(|e| e.to_string())?;
    let mut json: serde_json::Value = serde_json::from_str(&content).map_err(|e| e.to_string())?;
    {
        let files = json["files"]
            .as_array_mut()
            .ok_or_else(|| "files not found in manifest.json".to_string())?;

        files.retain(|f| {
            if let Some(path) = f["path"].as_str() {
                !path.to_lowercase().contains("plantilla") // Ignore the templates matches
            } else {
                true // Retain if the node contains the word path
            }
        });

        // Append the new nodes to the end
        for new_entry in new_entries {
            let value = serde_json::to_value(new_entry).map_err(|e| e.to_string())?;
            files.push(value);
        }
    }

    // Save the final file
    let pretty = serde_json::to_string_pretty(&json).map_err(|e| e.to_string())?;
    std::fs::write(json_path, pretty).map_err(|e| e.to_string())?;
    Ok(())
}
