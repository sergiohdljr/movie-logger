import { LogRepository } from "../repositories/LogRepository";
import { TLogsResponse } from "../types/logs.types";

type TDiary = {
  [key: string]: Array<unknown>;
};

export class LogDiaryService {
  public async execute(id: string): Promise<TLogsResponse<TDiary>> {
    const logRepository = new LogRepository();
    const logs = await logRepository.findAllByUserId(id);

    type TmonthsOfYear = {
      [key: number]: string;
    };

    type keyOfTmonthsOfYear = keyof TmonthsOfYear;

    const monthsOfYear: TmonthsOfYear = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    } as const;

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
      const monthNumber: keyOfTmonthsOfYear = log.movie_watched_date.getMonth();
      const monthName: keyDiary = monthsOfYear[monthNumber];
      diary[monthName].push(log);
    });

    const response = {
      data: diary,
      count: logs.length,
    };

    return response;
  }
}

/* data:[
 january: logs of january 
] */
