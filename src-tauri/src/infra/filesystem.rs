use std::path::{Path, PathBuf};

use regex::Regex;
use walkdir::WalkDir;

pub fn collect_renames(folder: &Path, re: &Regex, new_name: &str) -> Vec<(PathBuf, PathBuf)> {
    let mut to_rename = Vec::new();

    for entry in WalkDir::new(folder).into_iter().filter_map(|e| e.ok()) {
        let path = entry.path().to_path_buf();
        let old_name = path.file_name().unwrap().to_string_lossy();

        let new_name_str = re.replace(&old_name, new_name).into_owned();

        if new_name_str != old_name {
            let new_path = path.with_file_name(new_name_str);
            to_rename.push((path, new_path));
        }
    }
    to_rename.sort_by_key(|(old, _)| std::cmp::Reverse(old.components().count()));
    to_rename
}
