use crate::domain::implementations::ScaffoldData;
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};
use std::env;
use uuid::Uuid;

pub async fn insert_record(
    scaffold_data: ScaffoldData,
    db: &Pool<Postgres>, // Get the instance of the database
) -> Result<Uuid, sqlx::Error> {
    let id_template: (Uuid,) = sqlx::query_as(
        "INSERT INTO template(project_name, customer_name, storage_url) VALUES ($1, $2, $3) RETURNING id_template"
    ).bind(scaffold_data.name).bind(scaffold_data.customer).bind("STORAGE DATABASE URL").fetch_one(db).await?;

    for phase_name in scaffold_data.phases {
        sqlx::query("INSERT INTO phase(phase_name, template_id) VALUES($1, $2)")
            .bind(phase_name)
            .bind(id_template.0)
            .execute(db)
            .await?;
    }
    Ok(id_template.0)
}

pub async fn get_database_connection() -> Result<Pool<Postgres>, Box<dyn std::error::Error>> {
    let url =
        env::var("BYAASDATABASE").expect("Enviroment variable `BYAASDATABASE` not found in OS");

    let pool = PgPoolOptions::new()
        .max_connections(10)
        .connect(&url)
        .await?;

    Ok(pool) // Return an instance for working in database
}
