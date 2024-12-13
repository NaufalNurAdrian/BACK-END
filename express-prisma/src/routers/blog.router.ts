import { Router } from "express";
import { BlogController } from "../controller/blog.controller";
import {  checkaAdmin, verifyToken } from "../middlewares/verify";
import { Uploader } from "../services/uploader";

export class BlogRouter {
  private blogController: BlogController;
  private router: Router;

  constructor() {
    this.blogController = new BlogController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.blogController.getBlogs);
    this.router.post(
      "/",
      verifyToken,
      checkaAdmin,
      Uploader("memoryStorage", "blog-", "").single("thumbnail"),
      this.blogController.createBlog
    );

    this.router.get("/:slug", this.blogController.getBlogSlug);
  }

  getRouter(): Router {
    return this.router;
  }
}