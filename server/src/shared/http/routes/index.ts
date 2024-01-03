import { Router } from "express";
import { usersRoutes } from "@modules/users/routes/user.routes";
import { sessionRoutes } from "@modules/users/routes/session.routes";

export const router = Router();

router.use("/users", usersRoutes);
router.use("/session", sessionRoutes);
