use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct ScaffoldResponse {
    pub msg: String,
    pub details: String,
}

impl ScaffoldResponse {
    pub fn success(path: &str, matches: &usize) -> Self {
        Self {
            msg: "Template generated successfully".into(),
            details: format!("Total matches: '{}'\n Final location: '{}'", matches, path),
        }
    }
}

#[derive(Deserialize)]
pub struct ScaffoldData {
    pub name: String,
    pub phases: Vec<String>,
    pub customer: String,
}
