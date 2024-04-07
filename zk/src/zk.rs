use bellman::{
    groth16::{
        self, create_random_proof, generate_random_parameters, prepare_verifying_key, verify_proof,
    },
    Circuit, ConstraintSystem, SynthesisError,
};
use bls12_381::{Bls12, Scalar};
use ff::{Field, PrimeField};

use rand::rngs::OsRng;

// Circuit for checking equality of two integers
struct EqualityCircuit {
    a: Option<Scalar>,
    b: Option<Scalar>,
}

impl Circuit<Scalar> for EqualityCircuit {
    fn synthesize<CS: ConstraintSystem<Scalar>>(self, cs: &mut CS) -> Result<(), SynthesisError> {
        let a = cs.alloc(|| "a", || self.a.ok_or(SynthesisError::AssignmentMissing))?;
        let b = cs.alloc(|| "b", || self.b.ok_or(SynthesisError::AssignmentMissing))?;
        let one = CS::one();
        // Enforce equality constraint: a == b
        cs.enforce(
            || "equality constraint",
            |lc| lc + a,
            |lc| lc + one, // Use Scalar::one() instead of Fr::one()
            |lc| lc + b,
        );

        Ok(())
    }
}

// Function to verify equality of two integers using zk-SNARK
pub fn verify_equality(a: u64, b: u64) -> bool {
    
    let params =
        generate_random_parameters::<Bls12, _, _>(EqualityCircuit { a: None, b: None }, &mut OsRng)
            .unwrap();

    
    let pvk = groth16::prepare_verifying_key(&params.vk);

    
    let c = EqualityCircuit {
        a: Some(Scalar::from(a)), // Convert u64 to Scalar
        b: Some(Scalar::from(b)), // Convert u64 to Scalar
    };

    let proof = groth16::create_random_proof(c, &params, &mut OsRng).unwrap();

    groth16::verify_proof(&pvk, &proof, &[]).is_ok()
}


