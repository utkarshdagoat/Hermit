use actix_web::{web, App, HttpServer,HttpResponse, Responder};

async fn index() -> impl Responder {
    "Hello world!"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new().route("/",web::get().to(HttpResponse::Ok))
            
        
    })
    .bind(("127.0.0.1", 8081))?
    .run()
    .await
}