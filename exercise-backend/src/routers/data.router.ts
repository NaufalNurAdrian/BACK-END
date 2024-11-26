import { Router } from "express";
import { DataController } from "../controllers/data.controllers";
import { DataMiddleware } from "../middlewares/data.middleware";

export class DataRouter {
  private router: Router = Router();
  private userController: DataController;
  private userMiddleware: DataMiddleware;

  constructor() {
    this.userController = new DataController();
    this.userMiddleware = new DataMiddleware();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.userController.getData);
    this.router.get("/category", this.userController.getDataCategory);
    this.router.post("/", this.userController.addData);
    this.router.get(
      "/:id",
      this.userMiddleware.checkId,
      this.userController.getDataId
    ); 
    this.router.patch(
      "/:id",
      this.userMiddleware.checkId,
      this.userController.editData
    );
    this.router.delete(
      "/:id",
      this.userMiddleware.checkId,
      this.userController.deleteData
    );
    this.router.get(
      "/total/date-range",
      this.userMiddleware.checkDateRange,
      this.userController.getTotalByDateRange,
    );
    this.router.get(
      "/category/total/:category",
      this.userController.getTotalByCategory
    );
  }
  getRouter(): Router {
    return this.router;
  }
}
