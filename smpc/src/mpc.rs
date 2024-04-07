use crate::math::mersenne::{Mersenne61, MersenneField};
use crate::utils::prg::Prg;
use crate::vm::VirtualMachine;

pub struct Share<T: MersenneField> {
    pub id: u32,
    pub value: T,
}

impl<T: MersenneField> Share<T> {
    fn new(id: u32, value: T) -> Self {
        Self { id, value }
    }
}


/// Multiplicates two secret-shared values distributed among a set of parties.
///
/// This protocol executes the multiplication between two secret-shared values
/// whose shares has been distributed and stored in the memory of the parties
/// involved in the protocol. The multiplication is executed using a
/// multiplication triple whose shares have been distributed among the parties.
/// At the end of the execution of the protocol, the parties will end up with
/// the shares of the product under the ID `id_result` stored in the share
/// memory.
pub fn mult_protocol<'a, 'b, T>(
    parties: &mut Vec<&'b mut VirtualMachine<T>>,
    id_x: u32,
    id_y: u32,
    id_result:u32,
    triple_id: (u32,u32,u32),
) where
    T: MersenneField,
    'a: 'b,
{
    subtract_protocol(&mut *parties, id_x, triple_id.0, "epsilon");
    subtract_protocol(&mut *parties, id_y, triple_id.1, "delta");

    let epsilon = reconstruct_share(&*parties, "epsilon");
    let delta = reconstruct_share(&*parties, "delta");

    multiply_by_const_protocol(&mut *parties, &epsilon, triple_id.1, "t1");
    multiply_by_const_protocol(&mut *parties, &delta, triple_id.0, "t2");

    add_protocol(&mut *parties, "t1", "t2", "sum");
    add_protocol(&mut *parties, "sum", triple_id.2, "sumc");

    distribute_pub_value(&epsilon.multiply(&delta), "epsdelt", &mut *parties);
    add_protocol(&mut *parties, "sumc", "epsdelt", id_result);

    // Free memory of intermediate steps to make variables available.
    for party in parties {
        party.shares.remove("epsilon");
        party.shares.remove("delta");
        party.shares.remove("t1");
        party.shares.remove("t2");
        party.shares.remove("sum");
        party.shares.remove("sumc");
        party.shares.remove("epsdelt");
    }
}

pub fn distribute_pub_value<'a, 'b, T>(
    value: &T,
    id: &'a str,
    parties: &mut [&'b mut VirtualMachine<T>],
) where
    T: MersenneField,
    'a: 'b,
{
    parties[0].insert_share(id, Share::new(id, T::new(value.value())));
    for party in parties.iter_mut().skip(1) {
        party.insert_share(id, Share::new(id, T::new(0)));
    }
}

pub fn multiply_by_const_protocol<'a, 'b, T>(
    parties: &mut Vec<&'b mut VirtualMachine<T>>,
    value: &T,
    id: &'a str,
    id_result: &'a str,
) where
    T: MersenneField,
    'a: 'b,
{
    for party in parties {
        let share = party.get_share(id);
        let value_mult = share.value.multiply(value);

        let share_mult = Share::new(id_result, value_mult);
        party.insert_share(id_result, share_mult);
    }
}

pub fn subtract_protocol<T>(
    parties: &mut Vec<&mut VirtualMachine<T>>,
    id_a: u32,
    id_b: u32,
    id_result: u32,
) -> u32
 where
    T: MersenneField,
{
    multiply_by_const_protocol(&mut *parties, &T::new(1).negate(), id_b, "subtraction");
    add_protocol(&mut *parties, id_a, "subtraction", id_result);

    // Remove intermediate values
    for party in parties {
        party.shares.remove("subtraction");
    }
}

/// Adds two secret-shared values distributed among a set of parties.
///
/// This protocol executes the addition between two secret-shared values
/// whose shares has been distributed and stored in the memory of the parties
/// involved in the protocol. The addition is executed locally by the parties.
/// At the end of the execution of the protocol, the parties will end up with
/// the shares of the addition under the ID `id_result` stored in the share
/// memory.
pub fn add_protocol<T>(
    parties: &mut Vec<&mut VirtualMachine<Mersenne61>>,
    id_a: u32,
    id_b: u32
)
{
    for party in parties {
        let share_a = party.get_share(id_a);
        let share_b = party.get_share(id_b);

        let value_sum = share_a.value + &share_b.value;
        let share_sum = Share {
            id: id_a,
            value: value_sum,
        };
        party.insert_share(id_a, share_sum);
    }
}


pub fn generate_triple<'a, 'b, T>(
    parties: &mut Vec<&'b mut VirtualMachine<T>>,
    id_triple: (&'a str, &'a str, &'a str),
    prg: &mut Prg,
) where
    T: MersenneField,
    'a: 'b,
{
    let a = T::random(&mut *prg);
    let b = T::random(&mut *prg);
    let c = a.multiply(&b);

    simulate_random_dist(id_triple.0, &mut *parties, &a, &mut *prg);
    simulate_random_dist(id_triple.1, &mut *parties, &b, &mut *prg);
    simulate_random_dist(id_triple.2, &mut *parties, &c, &mut *prg);
}

