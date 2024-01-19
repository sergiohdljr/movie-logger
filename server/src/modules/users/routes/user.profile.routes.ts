import { Router } from "express";
import { UserProfileController } from "../controllers/UserProfileControler";
import { isAuthenticated } from "@shared/middlewares/isAuthenticated";
import { UserAvatarController } from "../controllers/UserAvatarController";
import multer from "multer";
import upload from "@config/upload";

export const userProfileRoutes = Router();
const userProfileController = new UserProfileController();

userProfileRoutes.get("/", isAuthenticated, userProfileController.show);
