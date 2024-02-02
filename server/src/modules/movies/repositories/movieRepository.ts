import { prisma } from "@shared/prisma/prismaClient";
import { TMovieRepository } from "../types/movies.types";
import { Movie, PrismaClient } from "@prisma/client";

export class MovieRepository implements TMovieRepository {
  private readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  public async findMoviesWatchedByUser(id: string): Promise<Array<Movie>> {
    const logs = await this.prismaClient.log.findMany({
      where: {
        userId: id,
      },
      include: {
        movie: true,
      },
    });

    const moviesWatched = logs.map(({ movie }) => movie);

    return moviesWatched;
  }
}
