import { Response, Request } from "express";
import { CreateUserService } from "../service/CreateUserService";

export class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, username, password, avatar } = req.body;

    const createUserService = new CreateUserService();

    const User = await createUserService.execute({
      name,
      email,
      avatar,
      password,
      username,
    });

    return res.json(User);
  }
}
