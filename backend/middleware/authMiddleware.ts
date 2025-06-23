import type { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { env } from "../env.js";
import prisma from "../config/db/db.js";

interface decoded_jwt {
  userId: number;
}

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No token");
  }

  const JWT_SECRET = env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as decoded_jwt;

    // Find user in database
    const user = await prisma.user.findUnique({
      where: {
        user_id: decoded.userId,
      },
    });

    if (!user) {
      res.status(401);
      throw new Error("Not authorized, user not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    console.log(req.user);
    console.log(role);

    if (!role) {
      res.status(404).json({
        message: "User role not found",
      });
      throw new Error("User role not found");
    }

    if (!roles.includes(role)) {
      res.status(403).json({
        message: "Forbidden, insufficient rights",
      });
      throw new Error("Forbidden, insufficient rights");
    }

    next();
  };
};
