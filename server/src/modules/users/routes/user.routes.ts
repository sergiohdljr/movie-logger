import { Router } from "express";
import { UserController } from "../controllers/UserController";
import multer from "multer";
import { isAuthenticated } from "@shared/middlewares/isAuthenticated";
import upload from "@config/upload";

export const usersRoutes = Router();
const userController = new UserController();

const uploadFile = multer({
  dest: upload.directoy,
  storage: upload.storage,
});

usersRoutes.post("/", userController.create);
usersRoutes.put("/", isAuthenticated, uploadFile.single("avatar"), userController.update);
