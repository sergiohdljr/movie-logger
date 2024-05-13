import Redis, { Redis as redisClient } from "ioredis";
import redisConfig from "@config/redis";
import { RedisCacheRepository } from "./redis.cache.types";
import { Key } from "./redis.cache.types";

export class RedisCache implements RedisCacheRepository {
  private readonly redis: redisClient;

  constructor() {
    this.redis = new Redis(redisConfig.config.redis);
  }

  public async SET(key: Key, value: unknown): Promise<void> {
    await this.redis.set(key, JSON.stringify(value));
  }

  public async GET<T>(key: Key): Promise<T | null> {
    const data = await this.redis.get(key);

    if (!data) return null;

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async DEL(key: Key): Promise<void> {
    await this.redis.del(key);
  }
}
