import { SignOptions, sign, verify } from "jsonwebtoken";
import { Authentication } from "../../interfaces/userauth.interface";
import { User } from "../../interfaces/user.interface";

const secretKey = `${process.env.ACCESS_KEY}` || "sangatrahasia";

export const generateToken = (payload: User, secret_key: string = secretKey, expiresIn: string | number = 15 * 60): string => {
    const options: SignOptions = {
        expiresIn // default 15 menit
    }
    return sign(payload, secret_key, options);
}

export const verifyToken = (token: string, secret_key: string = secretKey) => {
    return verify(token, secret_key) as Authentication;
};