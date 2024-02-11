import { Post } from "../interfaces/post.interface";
import prisma from "../utils/db/prisma";

export class PostService {
    private readonly post = prisma.post;

    public getAllPosts = async (): Promise<Post[]> => {
        const posts = await this.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                user_id: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                },
                published: true,
            }
        });

        return posts;
    }

    public getDetails = async (id: number): Promise<Post | null> => {
        const details = await this.post.findUnique({
            where: {
                id
            }
        });

        return details;
    }

    public createPost = async (dataPost: Post): Promise<Post> => {
        const post: Post = await this.post.create({
            data: {
                title: dataPost.title,
                content: dataPost.content,
                published: Boolean(dataPost.published),
                user: {
                    connect: {
                        id: +dataPost.user_id
                    }
                }
            }
        });

        return post;
    }

    public editPost = async (idPost: number, dataPost: Post): Promise<Post | null> => {
        const findPost = await this.post.findUnique({
            where: {
                id: idPost
            }

        });

        if (!findPost) {
            return null;
        }


        const updatePost: Post = await this.post.update({
            where: {
                id: idPost
            },
            data: {
                title: dataPost.title ?? findPost.title,
                content: dataPost.content ?? findPost.content,
                published: Boolean(dataPost.published) ?? findPost.published
            }
        });

        return updatePost;
    }

    public deletePost = async (idPost: number): Promise<Post | null> => {
        const findPost = await this.post.findUnique({
            where: {
                id: idPost
            }
        });

        if (!findPost) {
            return null;
        }

        const post = await this.post.delete({
            where: {
                id: idPost
            }
        });

        return post
    }
}