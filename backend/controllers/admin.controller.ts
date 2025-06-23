import asyncHandler from "express-async-handler";
import { createUserSchema } from "../schema/user.schema.js";
import type { Request, Response, NextFunction } from "express";
import { createUser, getUsers } from "../queries/admin.queries.js";
import { checkUser } from "../queries/auth.queries.js";
import bcrypt from "bcryptjs";

// @desc Get all user
// @route GET /api/admin/users
// @access PRIVATE

const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const users = await getUsers();
      console.log(users);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({
        message: "Error while fetching all users.",
      });
    }
  }
);

// @desc Create a new user from CRM
// @route POST /api/admin/users
// @access PRIVATE

const createNewUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const parsed = createUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const { username, email, password, role, phone } = parsed.data;

    const userAlreadyExists = await checkUser(email);

    if (userAlreadyExists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await createUser(username, email, hashedPassword, role, phone);
    console.log(user);

    res.status(201).json({ user });
  }
);

// @desc Test for admin
// @route GET /api/admin/users/test
// @access PRIVATE

const testForAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    res.status(200).json({
      message: "You are an admin!",
    });
  }
);

export { getAllUsers, createNewUser, testForAdmin };
