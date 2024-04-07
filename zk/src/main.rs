use actix_web::{web, App, HttpResponse, HttpServer, Responder};
mod zk;
use actix_cors::Cors;
use serde::Deserialize;
use std::net::{IpAddr, Ipv4Addr};

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

fn get_local_ipv4_address() -> Result<IpAddr, Box<dyn std::error::Error>> {
    let interfaces = pnet::datalink::interfaces();
    for iface in interfaces {
        for ip in iface.ips {
            if ip.ip().is_ipv4() {
                println!("{:?}" , ip.ip());
                return Ok(ip.ip());
            }
        }
    }

    Err("IPv4 address not found".into())
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
   
    HttpServer::new(|| {
        App::new()
            .wrap(Cors::permissive())
            .service(web::resource("/zkverify").route(web::post().to(zkverify)))
    })
    .bind(("0.0.0.0", 8081))?
    .run()
    .await
}
