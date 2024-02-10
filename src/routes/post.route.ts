import { Router } from "express";
import { Route } from "../interfaces/route.interface";
import { PostController } from "../controllers/post.controller";
import { authentication } from "../middlewares/authentication";

export class PostRoute implements Route {
    private readonly path = "/post";
    public readonly router = Router();
    private readonly post = new PostController();

    constructor() {
        this.initRoutes();
    }

    private initRoutes = () => {
        this.router.get(`${this.path}`, authentication, this.post.getAllPost);
        this.router.get(`${this.path}/:id`, authentication, this.post.getDetails);
    }
}