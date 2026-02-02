// Application run time, strong need to build the app
mod commands;
mod domain;
mod infra;
mod services;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::scaffold::generate_template
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
