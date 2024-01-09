import { LogRepository } from "../repositories/LogRepository";
import { TLogWithMovies, TLogsResponse } from "../types/logs.types";

export class FindLogsByIdService {
  public async execute(id: string): Promise<TLogsResponse<TLogWithMovies[]>> {
    const logRepository = new LogRepository();
    const logs = await logRepository.findAllByUserId(id);

    const response: TLogsResponse<TLogWithMovies[]> = {
      data: logs,
      count: logs.length,
    };

    return response;
  }
}
