import { Schema } from "express-validator";

export const registerSchema: Schema = {
    email: {
        isEmail: { errorMessage: "Please provide valid email" }
    },
    name: {
        isString: { errorMessage: "User name should be string" },
        exists: {
            errorMessage: "Name is required",
            options: { values: "falsy" }
        }
    },
    password: {
        exists: { errorMessage: "Password is required" },
        isLength: { 
            options: { min: 4 },
            errorMessage: "Password should be at least 4 characters"
        }
    }
}

export const loginSchema: Schema = {
    email: {
        isEmail: { errorMessage: "Please provide valid email" }
    },
    password: {
        exists: { errorMessage: "Password is required" },
        isLength: { 
            options: { min: 4 },
            errorMessage: "Password should be at least 4 characters"
        }
    }
}
