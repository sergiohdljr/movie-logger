import { RedisOptions } from "ioredis";

type RedisConnectionOptions = {
  config: {
    redis: RedisOptions;
  };
  drive: string;
};

export default {
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  },
  drive: "redis",
} as RedisConnectionOptions;
