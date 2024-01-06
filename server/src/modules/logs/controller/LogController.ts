import { Response, Request } from "express";
import { CreateLogService } from "../service/CreateLogService";
import { TLogBody } from "../types/logs.types";

export class LogController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createLogService = new CreateLogService();
    const { id } = req.user;
    const logMovie: TLogBody = req.body;

    const log = await createLogService.execute({ userId: id, ...logMovie });

    return res.json(log);
  }
}
