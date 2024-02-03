import { SignOptions, sign } from "jsonwebtoken";

const secretKey = `${process.env.SECRET_KEY}` || "sangatrahasia";

export const generateToken = (payload: object): string => {
    const options: SignOptions = {
        expiresIn: 5 * 60, // 5 menit
    } 
    return sign(payload, secretKey, options);
}