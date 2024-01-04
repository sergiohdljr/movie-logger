import { AppError } from "@shared/errors/AppErros";
import { UserRepository } from "../repositories/usersRepository";
import { TUserProfile } from "../types/user.types";

export class UserProfileService {
  public async execute(id: string): Promise<TUserProfile> {
    const userRepository = new UserRepository();

    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const { username, avatar, email, name } = user;

    return { name, username, email, avatar };
  }
}
