import { Router } from "express";
import { Expensev2Controller } from "../controllers/expensev2.controller";

export class Expensev2Router {
  private router: Router;
  private expensev2Controller: Expensev2Controller;

  constructor() {
    this.router = Router();
    this.expensev2Controller = new Expensev2Controller();
    this.initializerRouter();
  }

  private initializerRouter() {
    this.router.get("/", this.expensev2Controller.getExpress);
    this.router.post("/", this.expensev2Controller.addExpense);
    this.router.get("/:id", this.expensev2Controller.getExpenseId);
    this.router.patch("/:id", this.expensev2Controller.editExpense);
    this.router.delete('/:id', this.expensev2Controller.deleteExpense);
  }

  getRouter(): Router {
    return this.router;
  }
}
