import { Response, Request } from "express";
import { CreateLogService } from "../service/CreateLogService";
import { TLogBody, TQueryFilters } from "../types/logs.types";
import { FindLogsByIdService } from "../service/FindLogsByIdService";
import { DeleteLogService } from "../service/DeleteLogService";

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
    const querys = req.query;
    const { id } = req.user;
    const skip = parseInt(querys.skip as string);
    let filterQuery;

    if (querys.filter === "like") {
      filterQuery = Object.assign({}, { like: "like" }) as TQueryFilters;
    }

    if (querys.filter === "review") {
      filterQuery = Object.assign({}, { review: "review" }) as TQueryFilters;
    }

    const logs = await findLogsByIdService.execute(id, skip, filterQuery);

    return res.json(logs);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { log_id } = req.params;
    const deleteUserService = new DeleteLogService();

    await deleteUserService.execute(log_id, id);

    return res.json({});
  }
}
