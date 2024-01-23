import {genSalt, hash, compare} from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await genSalt(saltRounds);
    return hash(password, salt);
}

export const comparePassword = async (inputPassword: string, hashPassword: string): Promise<boolean> => {
    return await compare(inputPassword, hashPassword);
}