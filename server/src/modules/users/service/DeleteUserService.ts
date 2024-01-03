import { AppError } from "@shared/errors/AppErros";
import { UserRepository } from "../repositories/usersRepository";

export class DeleteUserService {
  public async execute(id: string): Promise<[]> {
    const userRepository = new UserRepository();

    const user = userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    await userRepository.remove(id);

    return [];
  }
}
