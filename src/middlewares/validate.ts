import { Request, Response, NextFunction } from "express";
import { ContextRunner, validationResult } from "express-validator";
import { HTTP_BAD_REQUEST } from "../utils/http/status.code";

export const validate = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HTTP_BAD_REQUEST).json({ errors: errors.array() });
    }
    
    return next();

  };
};