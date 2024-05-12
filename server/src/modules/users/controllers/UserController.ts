import { Response, Request } from "express";
import { CreateUserService } from "../service/CreateUserService";
import { UserRepository } from "../repositories/usersRepository";
import { UpdateUserService } from "../service/UpdateUserService";

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

  public async update(req: Request, res: Response): Promise<Response> {
    const updateUser = new UpdateUserService(new UserRepository());
    const user_id = req.user.id;
    const { name, username } = req.body;

    const userUpdated = await updateUser.execute(user_id, { name, username });

    return res.json(userUpdated);
  }
}
