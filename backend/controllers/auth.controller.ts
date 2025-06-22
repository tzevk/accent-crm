import asyncHandler from "express-async-handler";
import { loginUserSchema } from "../schema/user.schema.js";
import type { Request, Response, NextFunction } from "express";

// @desc Login a user
// @route POST /api/auth/login
// @access PUBLIC

const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const parsed = loginUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    return res.status(201).json({ user: parsed });
  }
);

// @desc Register a user
// @route POST /api/auth/register
// @access PUBLIC

export { loginUser };
