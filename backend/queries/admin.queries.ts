import prisma from "../config/db/db.js";
import { Role } from "../generated/prisma/index.js"; // Import Role enum

export async function createUser(
  username: string,
  email: string,
  hashedPassword: string,
  role: Role,
  phone?: string
) {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        role,
        phone,
      },
    });
    return user;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching all users: ", error);
    throw error;
  }
}
