import Redis, { Redis as redisClient } from "ioredis";
import redisConfig from "@config/redis";

export class RedisCache {
  private readonly redis: redisClient;

  constructor() {
    this.redis = new Redis(redisConfig.config.redis);
  }

  public async SET(key: string, value: unknown): Promise<void> {
    await this.redis.set(key, JSON.stringify(value));
  }

  public async GET<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);

    if (!data) return null;

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async DEL(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
