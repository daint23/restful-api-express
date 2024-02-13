import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { HTTP_FORBIDDEN, HTTP_UNAUTHORIZED } from "../utils/http/status.code";
import { verifyToken } from "../utils/jwt/jwt";
import { AuthService } from "../services/auth.service";
import { Authentication } from "../interfaces/userauth.interface";

declare global {
    namespace Express {
        interface Request {
            dataUser: Authentication
        }
    }
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = new AuthService();

        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader === "undefined") {
            return res.status(HTTP_FORBIDDEN).json({ message: "Forbidden" });
        }

        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        const decryptedData = verifyToken(bearerToken);

        const findUser = await user.findUserWithEmail(decryptedData.email);

        if (!findUser || !findUser.id) {
            return res.status(HTTP_UNAUTHORIZED).json({ message: "Unauthorized" });
        }

        req.dataUser = {
            id: findUser.id,
            email: findUser.email,
            name: findUser.name,
            role: findUser.role
        };

        next();
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            return res.status(HTTP_UNAUTHORIZED).json({ message: error.message });
        }
        next(error);
    }
};