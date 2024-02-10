import { User } from "../interfaces/user.interface";
import { hashPassword } from "../utils/bcrypt/bcrypt";
import prisma from "../utils/db/prisma";

export class AuthService {
    private readonly user = prisma.user;

    public findUserWithEmail = async (email: string): Promise<User | null> => {
        const user = await this.user.findUnique({
            where: {
                // bisa juga seperti ini
                // email: email
                email
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                role: true
            }
        });

        return user;

    }

    public createUser = async (dataUser: User): Promise<User> => {
        const password = await hashPassword(`${dataUser.password}`);

        // menginput data user ke table user
        const createUser = this.user.create({
            data: {
                email: dataUser.email,
                name: dataUser.name,
                password
            },
            select: {
                email: true,
                name: true
            }
        });

        return createUser;
    }
}