import { AppError } from "@shared/errors/AppErros";
import { UserRepository } from "../repositories/usersRepository";
import { TCreateSession, TResponseSession } from "../types/user.types";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { jwt } from "@config/auth";
import { SerializeUser } from "../dtos/serializeUser";

export class CreateSessionService {
  public async execute({ email, password }: TCreateSession): Promise<TResponseSession> {
    const userRepository = new UserRepository();

    const hasUser = await userRepository.findByEmail(email);

    if (!hasUser) {
      throw new AppError("User not found.", 404);
    }

    const isPasswordCorrect = await compare(password, hasUser.password);

    if (!isPasswordCorrect) {
      throw new AppError("Password incorrect", 401);
    }

    if (!jwt.jwt_secret) {
      throw new AppError("Sign Error", 500);
    }

    const token = sign({}, jwt.jwt_secret, {
      subject: hasUser.id,
      expiresIn: jwt.expiresIn,
    });

    const user = new SerializeUser(hasUser);

    const RESPONSE = { data: { user }, token } satisfies TResponseSession;

    return RESPONSE;
  }
}
