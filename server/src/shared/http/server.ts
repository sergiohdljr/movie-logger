import Express, { Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";
import { AppError } from "@shared/errors/AppErros";
import Cors from "cors";
import * as dotenv from "dotenv";
import upload from "@config/upload";

const app = Express();

dotenv.config();
app.use(Cors({ origin: "*" }));
app.use(Express.json());
app.use("/files", Express.static(upload.directoy));
app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: error.message,
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log(`running on ${process.env.PORT}`);
});
