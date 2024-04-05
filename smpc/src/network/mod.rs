use serde::{Deserialize, Serialize};

use crate::{math::mersenne::MersenneField, mpc::Share};

/// The network module is for communicating with the nodes in the smpc cluster
/// A cordinator will request the smpc node for some computation and it will return


/// Send a request to compute nodes for different types of use cases
/// Addition of 
#[derive(Serialize, Deserialize, Debug)]
enum Request {
    Ping,
    /// Get Share with the Share Id
    GetShare(usize),
    /// Perform Addition on the shares mentions
    Add(Vec<usize>),
    Multiply(Vec<usize>)
}

#[derive(Serialize, Deserialize, Debug)]
enum Response<T: MersenneField> {
    Pong,
    Share(Share<T>),
    Result(Share<T>)
}
