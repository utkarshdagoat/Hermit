import { NextResponse } from 'next/server';
import { newRedisInstance } from '@/app/lib/db/redis';

const redis = newRedisInstance;

export async function POST(req: Request) {
    await redis.connect();
    try {
        //@ts-ignore
        const { email, address } = await req.json();
        if (!email || !address) {
            return NextResponse.error();
        }
        await redis.hmset(`email:${email}`, 'address', address, 'isLoggedIn', 1);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error adding user:', error);
        return NextResponse.error();
    }
}
