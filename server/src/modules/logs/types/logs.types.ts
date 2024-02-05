import { Log, Prisma, Movie } from "@prisma/client";

export type TLogRepository = {
  save: (log: TCreateLogRepo) => Promise<Log>;
  update: (id: string, payload: TUpdateLog) => Promise<Log>;
  findById: (id: string) => Promise<Log | null>;
  findAllByUserId: (id: string, skip: number) => Promise<TLogsWithCount>;
  findAll: () => Promise<Log[]>;
  remove: (id: string) => Promise<void>;
};

export type TLogsWithCount = {
  logs: Array<TLogWithMovies>;
  total: number;
};

export type TCreateLogRepo = Prisma.LogCreateInput;

export type TUpdateLog = Partial<Omit<Log, "id">>;

export type TCreateLogService = Omit<Log, "id" | "created_at" | "updated_at"> & { movie: Movie };

export type TLogBody = Omit<TCreateLogService, "userId"> & { movie: Movie };

export type TLogWithMovies = Log & {
  movie: Movie;
};

export type TLogsResponse<T> = {
  pages?: number;
  count?: number;
  actualPage?: number;
  total?: number;
  data: T;
};

export type TDiary = {
  [key: string]: Array<Log>;
};

export type TMonthsOfYear = {
  [key: number]: string;
};

export type TKeyOfTmonthsOfYear = keyof TMonthsOfYear;

export const monthsOfYear: TMonthsOfYear = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
} as const;
