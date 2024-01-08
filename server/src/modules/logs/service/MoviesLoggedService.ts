import { UserRepository } from "@modules/users/repositories/usersRepository";
import { LogRepository } from "../repositories/LogRepository";
import { AppError } from "@shared/errors/AppErros";
import { Movie } from "@prisma/client";

export class MoviesLoggedService {
  public async execute(user_id: string): Promise<Movie[]> {
    const logRepository = new LogRepository();
    const userRepository = new UserRepository();

    const user = userRepository.findById(user_id);

    if (!user) throw new AppError("User not found", 404);

    const logs = await logRepository.findAllByUserId(user_id);

    const movies = logs.map((log) => log.movie);

    return movies;
  }
}
