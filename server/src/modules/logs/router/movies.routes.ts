import { Router } from "express";
import { isAuthenticated } from "@shared/middlewares/isAuthenticated";
import { LoggedMoviesController } from "../controller/LoggedMoviesController";

export const loggedMoviesRoutes = Router();
const loggedMoviesController = new LoggedMoviesController();

loggedMoviesRoutes.get("/", isAuthenticated, loggedMoviesController.index);
