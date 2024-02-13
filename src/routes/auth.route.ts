import { Router } from "express";
import { checkSchema } from "express-validator";
import { AuthController } from "../controllers/auth.controller";
import { Route } from "../interfaces/route.interface";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import { validate } from "../middlewares/validate";
import { authentication } from "../middlewares/authentication";

export class AuthRoute implements Route {
    private readonly path = "/auth";
    public readonly router = Router();
    private readonly auth = new AuthController();

    constructor(){
        this.initRoutes();
    }

    private initRoutes = () => {
        this.router.post(`${this.path}/register`, validate(checkSchema(registerSchema)), this.auth.registerUser);
        this.router.post(`${this.path}/login`, validate(checkSchema(loginSchema)), this.auth.loginUser);
        this.router.get(`${this.path}/refresh`, this.auth.refreshToken);
        this.router.get(`${this.path}/logout`, authentication, this.auth.logoutUser);
    }
}