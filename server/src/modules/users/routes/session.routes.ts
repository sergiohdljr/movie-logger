import { Router } from "express";
import { UserSessionController } from "../controllers/UserSessionController";

export const sessionRoutes = Router();
const sessionController = new UserSessionController();

sessionRoutes.post("/", sessionController.create);
