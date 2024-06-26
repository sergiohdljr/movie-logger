import { User } from "@prisma/client";

type TUserRepository = {
  save: (user: TCreateUser) => Promise<User>;
  update: (id: string, payload: TUpdateUser) => Promise<TUserWithoutPassword>;
  findById: (id: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  findByUsername: (username: string) => Promise<User | null>;
  findAll: () => Promise<User[]>;
  remove: (id: string) => Promise<void>;
};

type TCreateUser = Omit<User, "id" | "created_at" | "updated_at">;
type TUpdateUser = Partial<Omit<TCreateUser, "avatar" | "password" | "email">>;
type TUserWithoutPassword = Omit<User, "password">;
type TCreateSession = Pick<TCreateUser, "email" | "password">;
type TResponseSession = {
  data: {
    user: TUserWithoutPassword;
  };
  token: string;
};
type TUserProfile = Pick<User, "name" | "email" | "username" | "avatar">;

export {
  TCreateUser,
  TUpdateUser,
  TUserRepository,
  TCreateSession,
  TResponseSession,
  TUserWithoutPassword,
  TUserProfile,
};
