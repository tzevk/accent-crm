// src/lib/prisma.ts or src/db.ts
import { PrismaClient } from "../../generated/prisma/client.js";

const prisma = new PrismaClient();

export default prisma;
