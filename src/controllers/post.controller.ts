import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/post.service";
import { HTTP_CREATED, HTTP_OK } from "../utils/http/status.code";
import { Post } from "../interfaces/post.interface";

export class PostController {
    private readonly post = new PostService();

    public getAllPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await this.post.getAllPosts();
            return res.status(HTTP_OK).json({ data: posts });
        } catch (error) {
            next(error);
        }
    }

    public getDetails = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const details = await this.post.getDetails(+id);
            return res.status(HTTP_OK).json({ data: details })
        } catch (error) {
            next(error);
        }
    }

    public createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dataPost: Post = {
                title: req.body.title,
                content: req.body.content,
                published: req.body.published,
                user_id: req.dataUser.id
            }
            const post = await this.post.createPost(dataPost);

            return res.status(HTTP_CREATED).json({ data: post });
        } catch (error) {
            next(error)
        }
    }
}