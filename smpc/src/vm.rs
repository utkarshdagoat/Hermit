use crate::math::mersenne::MersenneField;
use crate::mpc::Share;
use std::collections::HashMap;
pub struct VirtualMachine<T: MersenneField> {
    pub id: u32,
    pub shares: HashMap<u32, Share<T>>,
}
impl<T: MersenneField> VirtualMachine<T> {
    pub fn new(id_machine: u32) -> Self {
        Self {
            id: id_machine,
            shares: HashMap::new(),
        }
    }

    pub fn insert_share(&mut self, id: u32, share: Share<T>) {
        if self.shares.contains_key(&id) {
            panic!("There exists a share with this id.");
        }

        self.shares.insert(id, share);
    }

    pub fn get_share<'a>(self, id: u32) -> &'a Share<T> {
        if let Some(share) = self.shares.get(&id) {
            share
        } else {
            panic!("The id `{}` is not registered in the virtual machine.", id);
        }
    }
}
