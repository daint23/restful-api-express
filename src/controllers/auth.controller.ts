import { Request, Response, NextFunction, CookieOptions } from "express";
import { AuthService } from "../services/auth.service";
import { HTTP_OK, HTTP_UNAUTHORIZED } from "../utils/http/status.code";
import { comparePassword } from "../utils/bcrypt/bcrypt";
import { User } from "../interfaces/user.interface";
import { generateToken, verifyToken } from "../utils/jwt/jwt";
import { HTTPException } from "../middlewares/error";

export class AuthController {
    private readonly auth = new AuthService();

    public registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // hanya menerima email, name, password
            const { email, name, password, confirm_password } = req.body;

            if (password !== confirm_password) {
                return res.status(403).json({
                    message: "Password not match"
                });
            };

            // Mencari user berdasarkan email yang dikirim user
            const findUser = await this.auth.findUserWithEmail(`${email}`);

            // jika sudah ada email yang terdaftar
            if (findUser) {
                return res.status(409).json({
                    message: "Email address is already registered"
                });
            }

            // create user
            const createUser = await this.auth.createUser({ email, name, password });

            // kembalikan respon
            return res.status(201).json({
                message: "Success",
                data: createUser
            });
        } catch (error) {
            next(error);
        }
    }

    public loginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const findUser = await this.auth.findUserWithEmail(`${email}`);
            if (!findUser) {
                return res.status(HTTP_UNAUTHORIZED).json({
                    message: "Wrong email or password"
                });
            };

            const compare = await comparePassword(`${password}`, `${findUser.password}`);
            if (!compare) {
                return res.status(HTTP_UNAUTHORIZED).json({
                    message: "Wrong email or password"
                });
            };

            const userData: User = {
                email: findUser.email,
                name: findUser.name,
                role: findUser.role
            };

            const refreshToken = generateToken(userData, `${process.env.REFRESH_KEY}`, "1d"); // 1 hari
            const cookieOpt: CookieOptions = {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 24 * 60 * 60 * 1000, // 1 hari
            }
            if (process.env.NODE_ENV === "production") cookieOpt.secure = true;
            res.cookie("refresh_token", refreshToken, cookieOpt);

            const access_token = generateToken(userData);

            return res.status(HTTP_OK).json({
                message: "Success",
                access_token
            });
        } catch (error) {
            next(error);
        }
    }

    public refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const message = 'Could not refresh access token';

            const refresh_token = req.cookies.refresh_token;
            if (!refresh_token) throw new HTTPException(HTTP_UNAUTHORIZED, message);

            const decode = verifyToken(refresh_token, `${process.env.REFRESH_KEY}`);

            const user = await this.auth.findUserWithEmail(decode.email);
            if (!user) throw new HTTPException(HTTP_UNAUTHORIZED, message);

            const userData: User = {
                email: decode.email,
                name: decode.name,
                role: decode.role
            }
            const access_token = generateToken(userData);

            return res.status(HTTP_OK).json({
                message: "Success",
                access_token
            });
        } catch (error) {
            next(error);
        }
    }

    public logoutUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.cookie("refresh_token", "", { maxAge: 1 });
            return res.status(HTTP_OK).json({ message: "Success" });
        } catch (error) {
            next(error);
        }
    }
}