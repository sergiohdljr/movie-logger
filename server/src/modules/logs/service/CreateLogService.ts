import { Log } from "@prisma/client";
import { LogRepository } from "../repositories/LogRepository";
import { UserRepository } from "@modules/users/repositories/usersRepository";
import { AppError } from "@shared/errors/AppErros";
import { TCreateLogService } from "../types/logs.types";

export class CreateLogService {
  public async execute(log: TCreateLogService): Promise<Log> {
    const logRepository = new LogRepository();
    const userRepository = new UserRepository();

    const { movieId, userId, movie, ...logData } = log;

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User does not exist", 404);
    }

    const createdLog = await logRepository.save({
      ...logData,
      movie: {
        connectOrCreate: {
          where: { id: movieId },
          create: { ...movie },
        },
      },
      User: {
        connect: {
          id: userId,
        },
      },
    });

    return createdLog;
  }
}
