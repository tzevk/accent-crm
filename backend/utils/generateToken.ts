import jwt from "jsonwebtoken";
import { env } from "../env.js";
import type { Response } from "express";

const generateToken = (res: Response, userId: number) => {
  const JWT_SECRET = env.JWT_SECRET;
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "1h",
  });

  const NODE_ENV = env.NODE_ENV;

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1 * 60 * 60 * 1000,
  });

  console.log("Cookie Set");
};

export default generateToken;
