import { SignOptions, sign, verify } from "jsonwebtoken";
import { Authentication } from "../../interfaces/userauth.interface";

const secretKey = `${process.env.SECRET_KEY}` || "sangatrahasia";

export const generateToken = (payload: object): string => {
    const options: SignOptions = {
        expiresIn: 5 * 60, // 5 menit
    }
    return sign(payload, secretKey, options);
}

export const verifyToken = (token: string) => {
    return verify(token, secretKey) as Authentication;
};