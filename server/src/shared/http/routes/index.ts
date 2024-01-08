import { Router } from "express";
import { usersRoutes } from "@modules/users/routes/user.routes";
import { sessionRoutes } from "@modules/users/routes/session.routes";
import { userProfileRoutes } from "@modules/users/routes/user.profile.routes";
import { logRoutes } from "@modules/logs/router/log.routes";
import { diaryRoutes } from "@modules/logs/router/diary.routes";
import { loggedMoviesRoutes } from "@modules/logs/router/movies.routes";

export const router = Router();

router.use("/users", usersRoutes);
router.use("/session", sessionRoutes);
router.use("/profile", userProfileRoutes);
router.use("/log", logRoutes);
router.use("/diary", diaryRoutes);
router.use("/movies", loggedMoviesRoutes);
