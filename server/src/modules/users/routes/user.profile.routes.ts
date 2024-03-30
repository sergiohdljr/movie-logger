import { Router } from "express";
import { UserProfileController } from "../controllers/UserProfileControler";
import { isAuthenticated } from "@shared/middlewares/isAuthenticated";

export const userProfileRoutes = Router();
const userProfileController = new UserProfileController();

userProfileRoutes.get("/", isAuthenticated, userProfileController.show);
