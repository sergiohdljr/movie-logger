import { Router, Response, Request } from "express";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.json("hello world");
});
