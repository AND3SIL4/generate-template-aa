use std::path::PathBuf;

use directories::UserDirs;

pub fn get_download_dir() -> Option<PathBuf> {
    let user_dirs = UserDirs::new()?;
    let download_dir = user_dirs.download_dir()?;
    Some(download_dir.to_path_buf())
}
