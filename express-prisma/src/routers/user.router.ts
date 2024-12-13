import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { checkaAdmin, verifyToken } from "../middlewares/verify";
import { Uploader } from "../services/uploader";

export class UserRouter {
  private userController: UserController;
  private router: Router;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      verifyToken,
      checkaAdmin,
      this.userController.getUsers
    );
    this.router.get("/profile", verifyToken, this.userController.getUserId);
    this.router.post("/", this.userController.CreateUser);
    this.router.patch(
      "/avatar",
      verifyToken,
      Uploader("diskStorage", "avatar-", "/avatar").single("file"),
      this.userController.editAvatar
    );
    this.router.patch("/avatar-cloud", verifyToken, Uploader("memoryStorage", "avatar-", "/avatar").single("file"), this.userController.editAvatarCloud)

    this.router.patch("/:id", this.userController.editUser);
    this.router.delete("/:id", this.userController.deleteUser);
  }
  getRouter(): Router {
    return this.router;
  }
}
