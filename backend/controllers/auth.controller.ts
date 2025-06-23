import asyncHandler from "express-async-handler";
import { loginUserSchema } from "../schema/user.schema.js";
import type { Request, Response, NextFunction } from "express";
import { checkUser } from "../queries/auth.queries.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// @desc Login a user
// @route POST /api/auth/login
// @access PUBLIC

const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const parsed = loginUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const userInput = parsed.data;
    const user = await checkUser(userInput.email);

    if (user && (await bcrypt.compare(userInput.password, user.password))) {
      generateToken(res, user.user_id);
      return res.status(200).json({
        message: "User Logged In Successfully",
        user: {
          id: user.user_id,
          username: user.username,
          email: user.email,
        },
      });
    }

    // If login fails, send 401 and throw error
    res.status(401);
    throw new Error("Invalid email or password");
  }
);

// @desc Register a user
// @route POST /api/auth/register
// @access PUBLIC

export { loginUser };
