import {
  TCreateLogRepo,
  TLogRepository,
  TLogsWithCount,
  TQueryFilters,
  TUpdateLog,
} from "../types/logs.types";
import { prisma } from "@shared/prisma/prismaClient";
import { PrismaClient, Log } from "@prisma/client";

export class LogRepository implements TLogRepository {
  private readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  public async save({ movie, ...log }: TCreateLogRepo): Promise<Log> {
    const createlog = await this.prismaClient.log.create({
      data: {
        ...log,
        movie,
      },
    });

    return createlog;
  }

  public async update(id: string, payload: TUpdateLog): Promise<Log> {
    const updatedLog = await this.prismaClient.log.update({
      data: payload,
      where: {
        id,
      },
    });

    return updatedLog;
  }
  public async findById(id: string): Promise<Log | null> {
    const log = await this.prismaClient.log.findUnique({
      where: { id },
    });

    return log;
  }

  public async findAllByUserId(
    userId: string,
    skip: number,
    filters?: TQueryFilters,
  ): Promise<TLogsWithCount> {
    const filter = {
      userId,
      ...(filters?.like !== null && filters?.like !== undefined && { like: true }),
      ...(filters?.review !== null &&
        filters?.review !== undefined && {
          review: {
            not: "",
          },
        }),
    };

    const [logs, total] = await this.prismaClient.$transaction([
      this.prismaClient.log.findMany({
        where: filter,
        include: {
          movie: true,
        },
        orderBy: {
          created_at: "desc",
        },
        skip,
        take: 14,
      }),

      this.prismaClient.log.count({
        where: filter,
      }),
    ]);

    return { logs, total };
  }

  public async findAll(): Promise<Log[]> {
    const logs = await this.prismaClient.log.findMany();
    return logs;
  }
  public async remove(id: string): Promise<void> {
    await this.prismaClient.log.delete({
      where: { id },
    });
  }
}
