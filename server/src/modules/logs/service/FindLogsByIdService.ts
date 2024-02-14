import { LogRepository } from "../repositories/LogRepository";
import { TLogWithMovies, TLogsResponse, TQueryFilters } from "../types/logs.types";

export class FindLogsByIdService {
  public async execute(
    id: string,
    skip: number,
    queryFilters?: TQueryFilters,
  ): Promise<TLogsResponse<TLogWithMovies[]>> {
    const logRepository = new LogRepository();

    if (!skip) {
      skip = 0;
    }

    const actualPage = skip + 1;

    if (skip > 0) {
      skip = skip === 1 ? 14 : 14 * skip;
    }

    const { logs, total } = await logRepository.findAllByUserId(id, skip, queryFilters);

    const pages = Math.ceil(total / 14);
    const count = logs.length;

    const response: TLogsResponse<TLogWithMovies[]> = {
      total,
      pages,
      actualPage,
      count,
      data: logs,
    };

    return response;
  }
}
