import { LogRepository } from "../repositories/LogRepository";
import { TDiary, TKeyOfTmonthsOfYear, TLogsResponse, monthsOfYear } from "../types/logs.types";

export class LogDiaryService {
  public async execute(id: string): Promise<TLogsResponse<TDiary>> {
    const logRepository = new LogRepository();
    const logs = await logRepository.findAllByUserId(id);

    type keyDiary = keyof TDiary;

    const diary: TDiary = {
      January: [],
      February: [],
      March: [],
      April: [],
      May: [],
      June: [],
      July: [],
      August: [],
      September: [],
      October: [],
      November: [],
      December: [],
    };

    logs.forEach((log) => {
      const monthNumber: TKeyOfTmonthsOfYear = log.movie_watched_date.getMonth();
      const monthName: keyDiary = monthsOfYear[monthNumber];
      diary[monthName].push(log);
    });

    const response = {
      data: diary,
    };

    return response;
  }
}

/* data:[
 january: logs of january 
] */
