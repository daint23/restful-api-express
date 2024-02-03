import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { HTTP_OK, HTTP_UNAUTHORIZED } from "../utils/http/status.code";
import { comparePassword } from "../utils/bcrypt/bcrypt";
import { User } from "../interfaces/user.interface";
import { generateToken } from "../utils/jwt/jwt";

export class AuthController {
    private readonly auth = new AuthService();

    public registerUser = async(req: Request, res: Response, next: NextFunction) => {
        try {
            // hanya menerima email, name, password
            const {email, name, password, confirm_password} = req.body;

            if(password !== confirm_password) {
                return res.status(403).json({
                    message: "Password not match"
                });
            };
            
            // Mencari user berdasarkan email yang dikirim user
            const findUser = await this.auth.findUserWithEmail(`${email}`);

            // jika sudah ada email yang terdaftar
            if(findUser){
                return res.status(409).json({
                    message: "Email address is already registered"
                });
            }

            // create user
            const createUser = await this.auth.createUser({email, name, password});

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
            if(!findUser){
                return res.status(HTTP_UNAUTHORIZED).json({
                    message: "Wrong email or password"
                });
            };
    
            const compare = await comparePassword(`${password}`, `${findUser.password}`);
            if(!compare){
                return res.status(HTTP_UNAUTHORIZED).json({
                    message: "Wrong email or password"
                });
            };
    
            const userData: User = {
                email: findUser.email,
                name: findUser.name,
                role: findUser.role
            };
            
            const token = generateToken(userData)
            return res.status(HTTP_OK).json({
                message: "Success",
                token
            });
        } catch (error) {
            next(error);
        }
    }
}