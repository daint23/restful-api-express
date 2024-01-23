import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { Route } from "../interfaces/route.interface";

export class AuthRoute implements Route {
    private readonly path = "/auth";
    public readonly router = Router();
    private readonly auth = new AuthController();

    constructor(){
        this.initRoutes();
    }

    private initRoutes = () => {
        this.router.post(`${this.path}/register`, this.auth.registerUser);
    }
}