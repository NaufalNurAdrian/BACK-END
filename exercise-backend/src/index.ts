import express, { Request, Response, Application } from "express";
import { DataRouter } from "./routers/data.router";
import cors from "cors";
import "dotenv/config";
import pool from "./config/db";
import { Expensev2Router } from "./routers/expensev2.router";

const PORT: number = 8001;

const app: Application = express();
app.use(express.json());
app.use(cors());

const userRouter = new DataRouter();
const expensev2Router = new Expensev2Router();

app.get("/api", (req: Request, res: Response) => {
  res.status(200).send("Hello, Welcome to my API");
});
app.use("/api/expense", expensev2Router.getRouter());
app.use("/api/data", userRouter.getRouter());

pool.connect((err, client, release) => {
  if (err) {
    return console.log("Error acquiring client", err.stack);
  }
  if (client) {
    client.query("SET search_path TO test", (queryErr) => {
      if (queryErr) {
        console.log("Error setting search path", queryErr.stack);
      } else {
        console.log('success connection "test" ✅');
      }
    });
  }

  release();
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
