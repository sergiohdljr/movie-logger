import Express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import { AppError } from "@shared/errors/AppErros";

const app = Express();

app.use(Express.json());
app.use(router);
app.use((error: Error, req: Request, res: Response) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(8080, () => {
  console.log("hello world");
});
