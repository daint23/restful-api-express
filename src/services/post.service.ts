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
}