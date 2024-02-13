import { AppError } from "@shared/errors/AppErros";
import { UserRepository } from "../repositories/usersRepository";
import { TUserProfile } from "../types/user.types";
import { RedisCache } from "@shared/cache/RedisCache";

export class UserProfileService {
  public async execute(id: string): Promise<TUserProfile> {
    const userRepository = new UserRepository();
    const redisService = new RedisCache();

    let profile = await redisService.GET<TUserProfile>(`${id}_MOVIE_LOGGER_USER_PROFILE`);

    if (!profile) {
      const user = await userRepository.findById(id);

      if (!user) {
        throw new AppError("User not found", 404);
      }

      const { username, avatar, email, name } = user;
      profile = { username, avatar, email, name };
      await redisService.SET(`${id}_MOVIE_LOGGER_USER_PROFILE`, { name, username, email, avatar });
    }

    return profile;
  }
}
