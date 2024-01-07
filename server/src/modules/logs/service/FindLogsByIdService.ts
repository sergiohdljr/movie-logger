import { LogRepository } from "../repositories/LogRepository";
import { TLogsResponse } from "../types/logs.types";

export class FindLogsByIdService {
  public async execute(id: string): Promise<TLogsResponse> {
    const logRepository = new LogRepository();
    const logs = await logRepository.findAllByUserId(id);

    const response: TLogsResponse = {
      data: logs,
      count: logs.length,
    };

    return response;
  }
}
