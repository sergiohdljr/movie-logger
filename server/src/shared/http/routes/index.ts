import { Router } from "express";
import { usersRoutes } from "@modules/users/routes/user.routes";
import { sessionRoutes } from "@modules/users/routes/session.routes";
import { userProfileRoutes } from "@modules/users/routes/user.profile.routes";

export const router = Router();

router.use("/users", usersRoutes);
router.use("/session", sessionRoutes);
router.use("/profile", userProfileRoutes);
