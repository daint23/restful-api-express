import { Router } from "express";
import { Route } from "../interfaces/route.interface";
import { PostController } from "../controllers/post.controller";
import { authentication } from "../middlewares/authentication";
import { validate } from "../middlewares/validate";
import { checkSchema } from "express-validator";
import { postSchema } from "../validations/post.validation";

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
        this.router.post(`${this.path}`, authentication, validate(checkSchema(postSchema)), this.post.createPost);
        this.router.put(`${this.path}/:id`, authentication, validate(checkSchema(postSchema)), this.post.editPost);
        this.router.delete(`${this.path}/:id`, authentication, this.post.deletePost);
    }
}