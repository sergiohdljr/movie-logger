import { Log, Prisma, Movie } from "@prisma/client";

export type TLogRepository = {
  save: (log: TCreateLogRepo) => Promise<Log>;
  update: (id: string, payload: TUpdateLog) => Promise<Log>;
  findById: (id: string) => Promise<Log | null>;
  findAllByUserId: (id: string) => Promise<Log[]>;
  findAll: () => Promise<Log[]>;
  remove: (id: string) => Promise<void>;
};

export type TCreateLogRepo = Prisma.LogCreateInput;

export type TUpdateLog = Partial<Omit<Log, "id">>;

export type TCreateLogService = Omit<Log, "id" | "created_at" | "updated_at"> & { movie: Movie };

export type TLogBody = Omit<TCreateLogService, "userId"> & { movie: Movie };
