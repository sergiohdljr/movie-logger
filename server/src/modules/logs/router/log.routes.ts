import { Router } from "express";
import { LogController } from "../controller/LogController";
import { isAuthenticated } from "@shared/middlewares/isAuthenticated";

export const logRoutes = Router();
const logController = new LogController();

logRoutes.post("/", isAuthenticated, logController.create);
