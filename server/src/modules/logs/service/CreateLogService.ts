import { Log } from "@prisma/client";
import { LogRepository } from "../repositories/LogRepository";
import { UserRepository } from "@modules/users/repositories/usersRepository";
import { AppError } from "@shared/errors/AppErros";
import { TCreateLogService } from "../types/logs.types";
import { MovieRepository } from "@modules/movies/repositories/movieRepository";

export class CreateLogService {
  public async execute(log: TCreateLogService): Promise<Log> {
    const logRepository = new LogRepository();
    const userRepository = new UserRepository();
    const movieRepository = new MovieRepository();

    const { movieId, userId, movie, ...logData } = log;

    if (!userId) {
      throw new AppError("Internal Server Error", 500);
    }

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User does not exist", 404);
    }

    const moviesWatched = await movieRepository.findMoviesWatchedByUser(userId);

    const hasMovieBeenWatched = moviesWatched.find((movieWatched) => movieWatched.id === movieId);

    if (hasMovieBeenWatched) {
      logData.had_watched_before = true;
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
