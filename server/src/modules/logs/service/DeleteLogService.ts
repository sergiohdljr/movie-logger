import { UserRepository } from "@modules/users/repositories/usersRepository";
import { LogRepository } from "../repositories/LogRepository";
import { AppError } from "@shared/errors/AppErros";

export class DeleteLogService {
  public async execute(log_id: string, user_id: string): Promise<void> {
    const logRepository = new LogRepository();
    const userRepository = new UserRepository();

    const log = await logRepository.findById(log_id);
    const user = await userRepository.findById(user_id);

    if (!user) throw new AppError("User not found", 404);
    if (!log) throw new AppError("Log not found", 404);

    const isUserTheSame = log.userId === user.id;

    if (!isUserTheSame) throw new AppError("You only have permition to delete your own log", 401);

    await logRepository.remove(log_id);

    return;
  }
}
