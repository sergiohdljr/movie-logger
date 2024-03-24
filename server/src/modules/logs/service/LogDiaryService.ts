import { LogRepository } from "../repositories/LogRepository";
import { TDiary, TKeyOfTmonthsOfYear, monthsOfYear } from "../types/logs.types";

export class LogDiaryService {
  public async execute(id: string): Promise<TDiary> {
    const logRepository = new LogRepository();
    const { logs } = await logRepository.findAllByUserId(id);

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

    Object.values(diary);

    logs.forEach((log) => {
      const monthNumber: TKeyOfTmonthsOfYear = log.movie_watched_date.getMonth();
      const monthName: keyDiary = monthsOfYear[monthNumber];
      diary[monthName].push(log);
    });

    

    return diary;
  }
}
