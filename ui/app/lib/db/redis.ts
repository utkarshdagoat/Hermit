import Redis from "ioredis";

export const newRedisInstance = new Redis("redis://localhost:6379", {
  lazyConnect: true,
});
