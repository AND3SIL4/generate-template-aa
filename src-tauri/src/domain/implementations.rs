use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub struct ScaffoldResponse {
    pub msg: String,
    pub details: String,
}

impl ScaffoldResponse {
    pub fn success(path: String) -> Self {
        Self {
            msg: "Template generated successfully".into(),
            details: format!(
                "Please check the following path where you template is located '{}'",
                path
            ),
        }
    }
}

#[derive(Deserialize)]
pub struct ScaffoldData {
    pub name: String,
    pub phases: Vec<String>,
    pub customer: String,
}
