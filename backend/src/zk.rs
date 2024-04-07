use num_bigint::{BigUint, ToBigUint};

/// Hash a string into a BigUint (not using real hashing for simplicity)
fn hash_to_biguint(input: &str) -> BigUint {
    input.len().to_biguint().unwrap()
}

/// Chaum Pederson Protocol: Verify whether two hashed values are equal
pub fn verify_strings(str1: &str, str2: &str) -> bool {
    // Hash the input strings
    let hash1 = hash_to_biguint(str1);
    let hash2 = hash_to_biguint(str2);

    // Fixed commitment values (for simplicity)
    let g = BigUint::from(2u32);
    let h = BigUint::from(3u32);
    let x = BigUint::from(4u32);
    let r = BigUint::from(5u32);
    let y1 = g.modpow(&x, &hash1);
    let y2 = g.modpow(&x, &hash2);

    // Check if the commitment values are equal
    if y1 != y2 {
        return false; // Return false if the commitment values are not equal
    }

    // Generate a random value for the challenge (for demonstration purposes)
    let c = BigUint::from(6u32);

    // Calculate the response values
    let s = (&r + &c * &x) % &hash1;
    let s_prime = (&r + &c * &x) % &hash2;

    // Verify if the responses are valid
    let a = (g.modpow(&s, &hash1) * h.modpow(&c, &hash1)) % &hash1;
    let b = (g.modpow(&s_prime, &hash2) * h.modpow(&c, &hash2)) % &hash2;

    a == b
}

fn main() {
    let str1 = "804b33542c3172aa05608e9d079e2a31726ace6dd4c78a130707862d76fbd30c";
    let str2 = "sahil";

    let result = verify_strings(str1, str2);
    println!("Are strings equal? {}", result);
}
