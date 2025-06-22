import { z } from "zod";

const RoleEnum = z.enum(["admin", "manager", "employee"]);
const StatusEnum = z.enum(["active", "inactive", "terminated"]);

export const createUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  role: RoleEnum.default("employee"),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
