import prisma from "../config/db/db.js";
import { Role } from "../generated/prisma/index.js"; // Import Role enum
import {
  createPersonalDetails,
  createQualificationDetails,
  documentCreateSchema,
} from "../schema/user.schema.js";
import type { z } from "zod";

type PersonalDetailsInput = z.infer<typeof createPersonalDetails>;
type QualificationDetailsInput = z.infer<typeof createQualificationDetails>;
type DocumentsInput = z.infer<typeof documentCreateSchema>;

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

export async function getSinglePersonalDetails(userId: number) {
  try {
    const personal_details = await prisma.personalDetail.findUnique({
      where: {
        user_id: userId,
      },
    });
    return personal_details;
  } catch (error) {
    console.error("Error getting personal details from DB");
    throw error;
  }
}

export async function addUserPersonalDetails(data: PersonalDetailsInput) {
  try {
    const personalDetail = await prisma.personalDetail.create({
      data,
    });
    return personalDetail;
  } catch (error) {
    console.error("Error adding personal details: ", error);
    throw error;
  }
}

export async function getEmployeeQualifications(userId: number) {
  try {
    const qual_details = await prisma.qualification.findMany({
      where: {
        user_id: userId,
      },
    });
    return qual_details;
  } catch (error) {
    console.error("Error getting personal details from DB");
    throw error;
  }
}

export async function addEmployeeQualification(
  data: QualificationDetailsInput
) {
  try {
    const qualificationDetail = await prisma.qualification.create({
      data,
    });
    return qualificationDetail;
  } catch (error) {
    console.error("Error adding qualification details: ", error);
    throw error;
  }
}

export async function CreateDocument(data: DocumentsInput) {
  try {
    const documents = await prisma.document.create({
      data,
    });
    return documents;
  } catch (error) {
    console.error("Error uploading documents: ", error);
    throw error;
  }
}

export async function GetDocument(userId: number) {
  try {
    const documents = await prisma.document.findMany({
      where: {
        user_id: userId,
      },
    });
    return documents;
  } catch (error) {
    console.error("Error getting document details from DB");
    throw error;
  }
}
