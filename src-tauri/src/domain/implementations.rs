use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize)]
pub struct ScaffoldResponse {
    pub msg: String,
    pub details: String,
}

impl ScaffoldResponse {
    pub fn success(path: &str, matches: &usize, id_template: &uuid::Uuid) -> Self {
        Self {
            msg: "Template generated successfully".to_string(),
            details: format!(
                "({}) Matches. Check the following folder: `{}`. Generation Id: {}",
                matches,
                path,
                id_template.to_string()
            ),
        }
    }
}

#[derive(Debug, Deserialize)]
pub struct ScaffoldData {
    pub name: String,
    pub phases: Vec<String>,
    pub customer: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Tag {
    namespace: String,
    value: String,
}
#[derive(Serialize, Debug, Clone, Deserialize)]
pub struct FileEntry {
    path: String,
    #[serde(rename = "newPath", default, skip_serializing_if = "Option::is_none")]
    new_path: Option<String>,
    #[serde(rename = "contentType")]
    content_type: String,
    #[serde(
        rename = "metadataForFile",
        default,
        skip_serializing_if = "Option::is_none"
    )]
    metadata_for_file: Option<Value>,
    #[serde(rename = "manualDependencies")]
    manual_dependencies: Vec<String>,
    #[serde(rename = "scannedDependencies")]
    scanned_dependencies: Vec<String>,
    #[serde(rename = "manualDependenciesNewPaths")]
    manual_dependencies_new_paths: Vec<String>,
    #[serde(rename = "scannedDependenciesNewPaths")]
    scanned_dependencies_new_paths: Vec<String>,
    description: String,
    author: String,
    tags: Vec<Tag>,
    excluded: bool,
}

impl FileEntry {
    /// Create a new, default FileEntry for an AA Taskbot file.
    pub fn new(
        path: String,
        content_type: String,
        dependencies: Vec<String>,
        description: String,
    ) -> Self {
        let is_xlsx = path.contains("xlsx");
        let tags = if is_xlsx {
            Vec::new()
        } else {
            vec![
                Tag {
                    namespace: "INTENDED_TARGET".into(),
                    value: "WINDOWS".into(),
                },
                Tag {
                    namespace: "COMPATIBLE_TARGET".into(),
                    value: "WINDOWS".into(),
                },
            ]
        };
        Self {
            path: path,
            new_path: None,
            content_type: content_type,
            metadata_for_file: None,
            manual_dependencies: Vec::new(),
            scanned_dependencies: dependencies,
            manual_dependencies_new_paths: Vec::new(),
            scanned_dependencies_new_paths: Vec::new(),
            description: description,
            author: String::new(),
            tags,
            excluded: false,
        }
    }
}
