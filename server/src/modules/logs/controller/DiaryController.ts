import { Response, Request } from "express";
import { LogDiaryService } from "../service/LogDiaryService";

export class DiaryController {
  public async find(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const diaryService = new LogDiaryService();

    const diary = await diaryService.execute(id);

    return res.json(diary);
  }
}
