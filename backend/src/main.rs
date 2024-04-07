use actix_web::{
    error, get, post,
    web::{self, Bytes},
    App, Error, HttpResponse, HttpServer, Responder,
};
mod zk;
use serde::Deserialize;
use serde::Serialize;
use serde_json;
use zk::{verify_strings};

#[derive(Deserialize)]
struct Hashes {
    hash1: String,
    hash2: String,
}
async fn zkverify(hashes: web::Json<Hashes>) -> impl Responder{
    if verify_strings(&hashes.hash1.as_str(), &hashes.hash2.as_str()) {
        HttpResponse::Ok().body("verified")    
    } else {
        HttpResponse::Ok().body("verified")
        
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().route("/", web::get().to(HttpResponse::Ok)))
        .bind(("127.0.0.1", 8081))?
        .run()
        .await
}
