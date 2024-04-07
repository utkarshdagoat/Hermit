use actix_web::{web, App, HttpResponse, HttpServer, Responder};
mod zk;
use serde::Deserialize;

#[derive(Deserialize)]
struct Sizes {
    size1: u64,
    size2: u64,
}

async fn zkverify(sizes: web::Json<Sizes>) -> impl Responder {
    if zk::verify_equality(sizes.size1, sizes.size2) {
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
