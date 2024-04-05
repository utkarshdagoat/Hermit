use smpc::{math::mersenne::MersenneField, vm::VirtualMachine};

struct Cordinator<'a, T: MersenneField> {
    parties: Vec<VirtualMachine<'a, T>>,
}

impl<'a, T: MersenneField> Cordinator<'a, T> {
    fn default() -> Self {}
}

fn main() {}

