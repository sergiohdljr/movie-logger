import { Response, Request } from "express";
import { CreateLogService } from "../service/CreateLogService";
import { TLogBody } from "../types/logs.types";
import { FindLogsByIdService } from "../service/FindLogsByIdService";

export class LogController {
  public async create(req: Request, res: Response): Promise<Response> {
    const createLogService = new CreateLogService();
    const { id } = req.user;
    const logMovie: TLogBody = req.body;

    const log = await createLogService.execute({ userId: id, ...logMovie });

    return res.json(log);
  }

  public async findByUserId(req: Request, res: Response): Promise<Response> {
    const findLogsByIdService = new FindLogsByIdService();
    const { id } = req.user;

    const logs = await findLogsByIdService.execute(id);

    return res.json(logs);
  }
}
