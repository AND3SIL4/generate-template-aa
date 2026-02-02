use std::{
    fs,
    io::{Read, Write},
    path::Path,
};

use regex::Regex;

pub fn replace_in_file_content(
    path: &Path,
    re: &Regex,
    new_name: &str,
) -> Result<Option<usize>, String> {
    let ext = path
        .extension()
        .and_then(|s| s.to_str())
        .map(|s| s.to_lowercase());

    if ext.as_deref() == Some("xlsx") {
        return Ok(None);
    }

    let mut content = String::new();
    fs::File::open(path)
        .map_err(|e| e.to_string())?
        .read_to_string(&mut content)
        .map_err(|e| e.to_string())?;

    let matches: Vec<_> = re.find_iter(&content).collect();
    let count = matches.len();

    if count == 0 {
        return Ok(None);
    }

    let new_content = re.replace_all(&content, new_name).into_owned();
    fs::File::create(path)
        .map_err(|e| e.to_string())?
        .write_all(new_content.as_bytes())
        .map_err(|e| e.to_string())?;

    Ok(Some(count))
}
