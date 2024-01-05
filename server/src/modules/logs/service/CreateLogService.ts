import { Log, Movie } from "@prisma/client";
import { LogRepository } from "../repositories/LogRepository";
import { UserRepository } from "@modules/users/repositories/usersRepository";
import { AppError } from "@shared/errors/AppErros";
import { TCreateLogService } from "../types/logs.types";

export class CreateLogService {
  public async execute(log: TCreateLogService, movie: Movie): Promise<Log> {
    const logRepository = new LogRepository();
    const userRepository = new UserRepository();

    const user = await userRepository.findById(log.userId);

    if (!user) {
      throw new AppError("User does not exist", 404);
    }

    const { movieId, userId, ...logData } = log;

    const createdLog = await logRepository.save({
      ...logData,
      movie: {
        connectOrCreate: {
          where: { id: movieId },
          create: {
            id: movie.id,
            name: movie.name,
            poster: movie.poster,
            year: movie.year,
          },
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
