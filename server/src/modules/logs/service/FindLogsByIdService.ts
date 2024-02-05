import { LogRepository } from "../repositories/LogRepository";
import { TLogWithMovies, TLogsResponse } from "../types/logs.types";

export class FindLogsByIdService {
  public async execute(id: string, skip: number): Promise<TLogsResponse<TLogWithMovies[]>> {
    const logRepository = new LogRepository();

    const actualPage = skip + 1;

    if (!skip) {
      skip = 0;
    }

    if (skip > 0) {
      skip = skip === 1 ? 14 : 14 * skip;
    }

    const { logs, total } = await logRepository.findAllByUserId(id, skip);

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
