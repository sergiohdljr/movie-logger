import { AppError } from "@shared/errors/AppErros";
import { UserRepository } from "../repositories/usersRepository";
import { TCreateUser } from "../types";
import { User } from "@prisma/client";

export class CreateUserService {
  public async execute({
    name,
    username,
    password,
    email,
    avatar,
  }: TCreateUser): Promise<User> {
    const userRepository = new UserRepository();

    const isUserSaved = await userRepository.findByEmail(email);

    if (isUserSaved) {
      throw new AppError("There's already a user with this e-mail.", 400);
    }

    const user = await userRepository.save({
      name,
      username,
      email,
      password,
      avatar,
    });

    return user;
  }
}
