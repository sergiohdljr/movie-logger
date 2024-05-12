import { Request, Response } from "express";
import { UpdateUserAvatarService } from "../service/UpdateAvatarService";

export class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatarService = new UpdateUserAvatarService();

    const user = await updateAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file!.filename,
    });

    return response.json(user);
  }
}
