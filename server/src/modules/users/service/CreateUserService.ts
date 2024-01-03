import { AppError } from "@shared/errors/AppErros";
import { UserRepository } from "../repositories/usersRepository";
import { TCreateUser, TUserWithoutPassword } from "../types/user.types";
import { hash } from "bcrypt";
import { SerializeUser } from "../dtos/serializeUser";

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

    const saveUser = await userRepository.save({
      name,
      username,
      email,
      password: hashedPassword,
      avatar,
    });

    const user = new SerializeUser(saveUser);

    return user;
  }
}
