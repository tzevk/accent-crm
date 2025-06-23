import prisma from "../config/db/db.js";

export async function checkUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch (error) {
    console.error("Error checking if a user exists: ", error);
    throw error;
  }
}
