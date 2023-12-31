import Express from "express";
import { Response, Request } from "express";

const app = Express();

app.use(Express.json());

app.get("/", (req: Request, res: Response) => {
  return res.json("hello world");
});

app.listen(8080, () => {
  console.log("hello world");
});
