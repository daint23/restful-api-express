export interface User {
    id?: number,
    email: string,
    name: string,
    password?: string,
    role?: string|null,
    created_at?: Date,
    updated_at?: Date
}