import { User } from "@prisma/client";

type TUserRepository = {
  save: (user: TCreateUser) => Promise<User>;
  update: (id: string, payload: TUpdateUser) => Promise<User>;
  findById: (id: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  findByUsername: (username: string) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  remove: (id: string) => Promise<void>;
};

type TCreateUser = Omit<User, "id" | "created_at" | "updated_at">;
type TUpdateUser = Partial<TCreateUser>;

export { TCreateUser, TUpdateUser, TUserRepository };
