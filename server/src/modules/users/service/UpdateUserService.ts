import { AppError } from "@shared/errors/AppErros";
import { TUpdateUser, TUserRepository, TUserWithoutPassword } from "../types/user.types";
import { UpdateUserAvatarService } from "./UpdateAvatarService";
import { RedisCache } from "@shared/cache/RedisCache";

export class UpdateUserService {
  private readonly userRepository: TUserRepository;

  constructor(repository: TUserRepository) {
    this.userRepository = repository;
  }

  public async execute(
    user_id: string,
    updateUserPayload: TUpdateUser,
    avatarFileName?: string,
  ): Promise<TUserWithoutPassword> {
    const updateAvatarService = new UpdateUserAvatarService();
    const user = await this.userRepository.findById(user_id);
    const redis = new RedisCache();
    const now = new Date();

    if (!user) {
      throw new AppError("User not found");
    }

    const usernameExists = await this.userRepository.findById(user?.username);

    if (usernameExists) {
      throw new AppError("User not found");
    }

    if (avatarFileName) {
      const updateUserAvatar = await updateAvatarService.execute({
        user_id,
        avatarFileName,
      });

      updateUserPayload.avatar = updateUserAvatar.avatar;

      const updatedUser = await this.userRepository.update(user_id, updateUserPayload);
      updatedUser.updated_at = now;
      await redis.DEL(`${user_id}-_MOVIE_LOGGER_USER_PROFILE`);
      return updatedUser;
    }

    const updateUserWithoutAvatar = await this.userRepository.update(user_id, updateUserPayload);
    updateUserWithoutAvatar.updated_at = now;
    await redis.DEL(`${user_id}-_MOVIE_LOGGER_USER_PROFILE`);
    return updateUserWithoutAvatar;
  }
}
