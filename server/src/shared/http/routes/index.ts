import { Router } from "express";
import { usersRoutes } from "@modules/users/routes/user.routes";

export const router = Router();

router.use("/users", usersRoutes);
