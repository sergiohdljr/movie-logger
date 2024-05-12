import { Router } from "express";
import { UserController } from "../controllers/UserController";
import multer from "multer";
import { isAuthenticated } from "@shared/middlewares/isAuthenticated";
import upload from "@config/upload";
import { UserAvatarController } from "../controllers/UserAvatarController";

export const usersRoutes = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();

const uploadFile = multer({
  dest: upload.directoy,
  storage: upload.storage,
});

usersRoutes.post("/", userController.create);
usersRoutes.put("/", isAuthenticated, userController.update);
usersRoutes.patch(
  "/avatar",
  isAuthenticated,
  uploadFile.single("avatar"),
  userAvatarController.update,
);
