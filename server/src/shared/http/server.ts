import Express from "express";
import { router } from "./routes";

const app = Express();

app.use(Express.json());
app.use(router);

app.listen(8080, () => {
  console.log("hello world");
});
