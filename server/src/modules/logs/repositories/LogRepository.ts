import { TCreateLogRepo, TLogRepository, TUpdateLog } from "../types/logs.types";
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
