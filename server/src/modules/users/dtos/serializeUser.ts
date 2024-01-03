import { TUserWithoutPassword } from "../types/user.types";
import { User } from "@prisma/client";

export class SerializeUser implements TUserWithoutPassword {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly avatar: string | null;
  readonly username: string;
  readonly created_at: Date;
  readonly updated_at: Date;
  constructor({ id, email, name, avatar, username, created_at, updated_at }: User) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.username = username;
    this.avatar = avatar;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
