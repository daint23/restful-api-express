import { User } from "./user.interface";

export interface Post {
    id?: number;
    title: string;
    content?: string|null;
    published?: Boolean;
    user?: User;
    user_id: number;
    created_at?: Date;
    updated_at?: Date;
}