import { NextResponse } from 'next/server';
import { newRedisInstance } from '@/app/lib/db/redis';

const redis = newRedisInstance;

export async function GET(req: Request) {
    await redis.connect();
    try {
        const { email } = await req.json();
        if (!email) return NextResponse.error();
        await redis.hset(`email:${email}`, 'isLoggedIn', 0);
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Error logging out user:', error);
        return NextResponse.error();
    }
}