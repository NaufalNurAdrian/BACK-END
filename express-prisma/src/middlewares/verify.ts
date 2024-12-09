import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserPayload } from "../custom";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try{
        // const token = req.header("Authorization")?.replace("Bearer ", "");
        const token = req.cookies?.token
        if (!token) throw "Unauthorize!"

        const verifyUser = verify(token, process.env.JWT_KEY!);
        req.user = verifyUser as UserPayload;

        next();
    } catch (err) {
        console.log(err);
        res.status(200).send(err)
    }
};

export const checkaAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(req.user?.role == "Admin") {
        next();
    } else {
        res.status(403).send("Access Denied");
    }
} 