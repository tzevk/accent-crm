import prisma from "../config/db/db.js";

export async function createUser() {
  const user = await prisma.user.create({
    data: {
      username: "Hello",
      password: "123456",
      email: "hi@gmail.com",
      role: "admin",
      phone: "123456789",
    },
  });
  return user;
}
