import { AppError } from "@shared/errors/AppErros";
import { UserRepository } from "../repositories/usersRepository";
import path from "path";
import fs from "fs";
import upload from "@config/upload";
import { RedisCache } from "@shared/cache/RedisCache";
import { TUserWithoutPassword } from "../types/user.types";

type TUploadAvatarPayload = {
  user_id: string;
  avatarFileName: string;
};

export class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFileName,
  }: TUploadAvatarPayload): Promise<TUserWithoutPassword> {
    const usersRepository = new UserRepository();
    const redisService = new RedisCache();

    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User not found", 404);

    if (user.avatar) {
      const userAvatarFilePath = path.join(upload.directoy, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    const updatedUser = await usersRepository.update(user_id, user);

    await redisService.DEL(`${user_id}_MOVIE_LOGGER_USER_PROFILE`);

    return updatedUser;
  }
}
