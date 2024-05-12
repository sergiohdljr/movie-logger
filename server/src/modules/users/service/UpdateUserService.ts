import { AppError } from "@shared/errors/AppErros";
import { TUpdateUser, TUserRepository, TUserWithoutPassword } from "../types/user.types";
import { RedisCache } from "@shared/cache/RedisCache";

export class UpdateUserService {
  private readonly userRepository: TUserRepository;

  constructor(repository: TUserRepository) {
    this.userRepository = repository;
  }

  public async execute(
    user_id: string,
    updateUserPayload: TUpdateUser,
  ): Promise<TUserWithoutPassword> {
    const user = await this.userRepository.findById(user_id);
    const redis = new RedisCache();

    if (!user) {
      throw new AppError("User not found");
    }

    const usernameExists = await this.userRepository.findById(user.username);

    if (usernameExists && usernameExists.id !== user_id) {
      throw new AppError("Username already exist");
    }

    const updateUserWithoutAvatar = await this.userRepository.update(user_id, updateUserPayload);

    await redis.DEL(`${user_id}_MOVIE_LOGGER_USER_PROFILE`);
    return updateUserWithoutAvatar;
  }
}
