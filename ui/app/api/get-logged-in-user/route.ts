import { NextResponse } from 'next/server';
import { newRedisInstance } from '@/app/lib/db/redis';

const redis = newRedisInstance;

export async function GET(req: Request) {
    await redis.connect();
    const emailKeys = await redis.keys('email:*');
    let loggedInEmail = null;
    
    for (const key of emailKeys) {
        const isLoggedIn = await redis.hget(key, 'isLoggedIn');
        if (isLoggedIn == '1') {
            loggedInEmail = key.split(':')[1];
        }
    }

    if (!loggedInEmail) {
        return NextResponse.error();
    }
    return NextResponse.json({ email: loggedInEmail });
}
