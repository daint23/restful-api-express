import { NextFunction, Request, Response } from "express";

export class HTTPException extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export const ErrorMiddleware = (error: HTTPException, req: Request, res: Response, next: NextFunction) => {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";

    console.log(error); // menampilkan error di terminal atau console
    return res.status(status).json({ message });
};