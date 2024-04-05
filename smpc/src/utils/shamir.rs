use std::usize;

use super::prg::Prg;
use crate::math::mersenne::{ Mersenne61, MersenneField};

fn random_shamir_polynomial(secret: Mersenne61, degree: usize) -> Vec<Mersenne61> {
    let mut prg = Prg::new(None);
    let mut f = vec![secret];
    for _ in 0..degree {
        f.push(Mersenne61::random(&mut prg));
    }
    f
}

fn evaluate_shamir_polynomial(f: &[Mersenne61], x: &Mersenne61) -> Mersenne61 {
    let mut y = Mersenne61::new(0);
    for c in f.iter().rev() {
        y = y * x + c;
    }
    y
}

/// Langrange Interpolation to get F(0)
fn langrange_interpolate_shamir(xs: Vec<u64>, ys: Vec<Mersenne61>) -> Mersenne61 {
    assert!(xs.len() == ys.len());
    let mut y = Mersenne61::new(0);
    for (i, (x0, y0)) in xs.iter().zip(ys.clone()).enumerate() {
        let mut li = Mersenne61::new(1);
        for (j, (x1, _y1)) in xs.iter().zip(ys.clone()).enumerate() {
            if i != j {
                let x_one = Mersenne61::new(*x1);
                let x_zero = Mersenne61::new(*x0);
                let mut temp = x_one + &x_zero;
                temp = temp.inverse();
                temp = temp.multiply(&x_one);
                li = li * &temp;
            }
        }

        y = y + &(li * &y0);
    }
    y
}

pub fn generate_secrets(secret: Mersenne61, n: usize, k: usize) -> Vec<(u64, Mersenne61)> {
    let x_cords: Vec<u64> = (0..=(n-1) as u64).collect();
    let f = random_shamir_polynomial(secret, k - 1);
    let shares = x_cords
        .into_iter()
        .map(|x| {
            let y = evaluate_shamir_polynomial(&f, &Mersenne61::new(x));
            println!("{:?}" , y);
            (x, y)
        })
        .collect();
    shares
}
pub fn reconstruct_share(shares: &[(u64, Mersenne61)]) -> Mersenne61 {
    let xs = shares.into_iter().map(|s| s.0).collect();
    let ys = shares.into_iter().map(|s| s.1).collect();

    langrange_interpolate_shamir(xs, ys)
}

#[test]
fn base_test() {
    let number: u64 = 73;
    let shares = generate_secrets(Mersenne61::new(number), 5, 3);
    let reconstruct = reconstruct_share(&shares[..4]);
    assert_eq!(reconstruct.value(), number);
}

