export type Key = `${string}_MOVIE_LOGGER_USER_PROFILE`;

export type RedisCacheRepository = {
  SET: (key: Key, value: unknown) => Promise<void>;
  GET: <T>(key: Key) => Promise<T | null>;
  DEL: (key: Key) => Promise<void>;
};
