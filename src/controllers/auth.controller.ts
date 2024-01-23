import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

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
}