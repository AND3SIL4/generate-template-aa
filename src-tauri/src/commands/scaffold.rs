use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct ScaffoldData {
    name: String,
    phases: Vec<String>,
    customer: String,
}

#[tauri::command]
pub fn generate_template(scaffold_data: ScaffoldData) {
    println!("Name {}", scaffold_data.name);
    println!("Phases {:?}", scaffold_data.phases);
    println!("Customer {}", scaffold_data.customer);
}
