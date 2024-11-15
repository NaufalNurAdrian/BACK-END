import { Request, Response } from "express";
import fs from "fs";
import { IUsers } from "../types/userid";

export class UserController {
  getUsers(req: Request, res: Response) {
    const users: IUsers[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );
    res.status(200).send({ users });
  }
  getUserId(req: Request, res: Response) {
    const { id } = req.params;
    const users: IUsers[] = JSON.parse(
      fs.readFileSync("./db/users.json", "utf-8")
    );
    const resultId = users.find((item) => item.id == id);
    if (resultId) {
      res.status(200).send({ user: resultId });
    } else {
      res.status(400).send({ message: "User not found" });
    }
}
    addUser(req: Request, res: Response){
        const users: IUsers[] = JSON.parse(
            fs.readFileSync("./db/users.json", "utf-8")
          );
        const id = String(Math.max(...users.map(item => parseInt(item.id))) + 1)
        const {name, email, password} = req.body
        const newData: IUsers = {id, name, email, password}
        users.push(newData)

        fs.writeFileSync("./db/users.json", JSON.stringify(users), "utf-8")

        res.status(200).send({user: newData})
    }
}