use actix_web::{web, App, HttpResponse, HttpServer, Responder};
mod zk;
use serde::Deserialize;

#[derive(Deserialize)]
struct Hashes {
    hash1: String,
    hash2: String,
}

async fn zkverify(hashes: web::Json<Hashes>) -> impl Responder {
    if zk::verify_strings(&hashes.hash1, &hashes.hash2) {
        HttpResponse::Ok().body("verified")
    } else {
        HttpResponse::Ok().body("not-verified")
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().service(web::resource("/zkverify").route(web::post().to(zkverify)))
    })
    .bind(("127.0.0.1", 8081))?
    .run()
    .await
}
