import { Log } from "@prisma/client";

export type TLogRepository = {
  save: (log: TCreateLog) => Promise<Log>;
  update: (id: string, payload: TUpdateLog) => Promise<Log>;
  findById: (id: string) => Promise<Log | null>;
  findAll: () => Promise<Log[]>;
  remove: (id: string) => Promise<void>;
};

export type TCreateLog = Omit<Log, "id" | "created_at" | "updated_at">;
export type TUpdateLog = Partial<Omit<Log, "id">>;
