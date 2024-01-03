import { Response, Request } from "express";
import { CreateSessionService } from "../service/CreateSessionService";

export class UserSessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userSessionService = new CreateSessionService();
    const { email, password } = request.body;

    const User = await userSessionService.execute({ email, password });

    return response.json(User);
  }
}
