import { LogRepository } from "../repositories/LogRepository";
import { TDiary, TKeyOfTmonthsOfYear } from "../types/logs.types";

type TuserDiary = Array<{
  month: string;
  logs: Array<TDiary | []>;
}>;

export class LogDiaryService {
  public async execute(id: string): Promise<TuserDiary> {
    const logRepository = new LogRepository();
    const { logs } = await logRepository.findAllByUserId(id);
    const actualMonth = new Date().getMonth();

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

    const diaryReduce = logs.reduce((userDiary: TuserDiary, log) => {
      const monthsArray = Object.keys(diary);
      const diaryValuesArray = Object.values(diary);

      const monthNumber: TKeyOfTmonthsOfYear = log.movie_watched_date.getMonth();
      const monthName: keyDiary = monthsArray[monthNumber];

      const logsByMonth = monthsArray.map((month, index) => {
        return {
          month,
          logs: diaryValuesArray[index],
        };
      });

      logsByMonth.forEach((logByMonth) => {
        if (logByMonth.month === monthName) {
          logByMonth.logs.push(log);
        }
      });

      const showUntilActualMonth = logsByMonth.filter((_, index) => index <= actualMonth);

      return showUntilActualMonth;
    }, []);

    return diaryReduce;
  }
}
