import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/post.service";
import { HTTP_CREATED, HTTP_NOT_FOUND, HTTP_OK } from "../utils/http/status.code";
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

    public editPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { title, content, published } = req.body;
            const { id: user_id } = req.dataUser;

            const dataPost: Post = {
                title,
                content,
                published,
                user_id
            }

            const editPost = await this.post.editPost(+id, dataPost);
            if (!editPost) {
                return res.status(HTTP_NOT_FOUND).json({ message: "id not found" });
            }

            return res.status(HTTP_OK).json({ data: editPost });
        } catch (error) {
            next(error);
        }
    }

    public deletePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;

            const post = await this.post.deletePost(+id);
            if (!post) {
                return res.status(HTTP_NOT_FOUND).json({ message: "id not found" });
            }

            return res.status(HTTP_OK).json({ message: "Success" });
        } catch (error) {
            next(error)
        }
    }
}