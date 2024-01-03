import { AppError } from "@shared/errors/AppErros";
import { UserRepository } from "../repositories/usersRepository";
import { TCreateUser, TUserWithoutPassword } from "../types/user.types";
import { hash } from "bcrypt";

export class CreateUserService {
  public async execute({
    name,
    username,
    password,
    email,
    avatar,
  }: TCreateUser): Promise<TUserWithoutPassword> {
    const userRepository = new UserRepository();

    const isUserEmailAlreadySave = await userRepository.findByEmail(email);

    if (isUserEmailAlreadySave) {
      throw new AppError("There's already a user with this e-mail.", 400);
    }

    const isUserUsernameAlreadySave = await userRepository.findByUsername(username);

    if (isUserUsernameAlreadySave) {
      throw new AppError("There's already a user with this username.", 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = await userRepository.save({
      name,
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    const userResponse = {
      username,
      email,
      avatar,
      id: user.id,
      name,
      created_at: user.created_at,
      updated_at: user.updated_at,
    } satisfies TUserWithoutPassword;

    return userResponse;
  }
}
