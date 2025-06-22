import asyncHandler from "express-async-handler";
import { createUserSchema } from "../schema/user.schema.js";
import type { Request, Response, NextFunction } from "express";
import { createUser } from "../queries/admin.queries.js";

// @desc Get all user
// @route GET /api/admin/users
// @access PRIVATE

const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {}
);

// @desc Create a new user from CRM
// @route POST /api/admin/users
// @access PRIVATE

const createNewUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const parsed = createUserSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
    }

    const user = await createUser();
    console.log(user);

    res.status(201).json({ user: parsed });
  }
);

export { getAllUsers, createNewUser };
