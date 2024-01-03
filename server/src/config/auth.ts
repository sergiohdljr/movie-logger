import * as dotenv from "dotenv";

dotenv.config();

export const jwt = {
  jwt_secret: process.env.JWT_SECRET,
};
