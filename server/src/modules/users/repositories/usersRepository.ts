import { prisma } from "@shared/prisma/prismaClient";
import { PrismaClient, User } from "@prisma/client";
import { TCreateUser, TUpdateUser, TUserRepository } from "../types";

export class UserRepository implements TUserRepository {
  private readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  public async save(user: TCreateUser): Promise<User> {
    const createdUser = await this.prismaClient.user.create({
      data: user,
    });

    return createdUser;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  public async findByUsername(username: string): Promise<User | null> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.prismaClient.user.findMany();
    return users;
  }

  public async update(id: string, payload: TUpdateUser): Promise<User> {
    const user = this.prismaClient.user.update({
      where: { id },
      data: payload,
    });

    return user;
  }

  public async remove(id: string): Promise<void> {
    await this.prismaClient.user.delete({
      where: { id },
    });
  }
}
