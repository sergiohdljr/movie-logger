import { Response, Request } from "express";
import { UserProfileService } from "../service/UserProfileService";

export class UserProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const userProfileService = new UserProfileService();

    const profile = await userProfileService.execute(id);

    return res.json(profile);
  }
}
