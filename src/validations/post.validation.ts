import { Schema } from "express-validator";

export const postSchema: Schema = {
    title: {
        isString: { errorMessage: "Title should be string" },
        exists: {
            errorMessage: "Title is required",
            options: { values: "falsy" }
        },
        isLength: {
            options: { max: 255 },
            errorMessage: "Title too long"
        }
    },
    content: {
        exists: {
            errorMessage: "Title is required",
            options: { values: "falsy" }
        }
    }
}