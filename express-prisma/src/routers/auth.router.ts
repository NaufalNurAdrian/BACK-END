import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

export class AuthRouter{
    private authController: AuthController
    private router: Router

    constructor() {
        this.authController = new AuthController()
        this.router = Router()
        this.initializeRouter()
    }
    private initializeRouter() {
        this.router.post("/register", this.authController.registerUser)
        this.router.post("/login", this.authController.loginUser)

        this.router.patch("/verify/:token", this.authController.verifyUser)
    }

    getRouter(): Router {
        return this.router
    }
}