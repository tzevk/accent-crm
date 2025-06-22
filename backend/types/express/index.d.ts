import type { User as PrismaUser } from "../../generated/prisma/index.js";

declare global {
  namespace Express {
    interface Request {
      user?: PrismaUser;
    }
  }
}

export {};
