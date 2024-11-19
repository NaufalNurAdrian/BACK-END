import { NextFunction, Request, Response } from "express";
import { IUsers } from "../types/userid";
import fs from "fs";

export class UserMiddleware {
  checkId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const users: IUsers[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );
    const resultId = users.find((item) => item.id == id);
    if (resultId) {
      next();
    } else {
      res.status(400).send({ message: "User not found" });
    }
  }
}
