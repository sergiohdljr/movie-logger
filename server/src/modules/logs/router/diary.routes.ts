import { Router } from "express";
import { isAuthenticated } from "@shared/middlewares/isAuthenticated";
import { DiaryController } from "../controller/DiaryController";

export const diaryRoutes = Router();
const diaryController = new DiaryController();

diaryRoutes.get("/", isAuthenticated, diaryController.find);
