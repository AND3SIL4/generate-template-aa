// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    byaas_lib::run(); // Application entry point
}

// R2h5aG9yc2hnIGViIERRRzNWTE80
