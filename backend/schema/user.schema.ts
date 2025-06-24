import { z } from "zod";

const RoleEnum = z.enum(["admin", "manager", "employee"]);
const StatusEnum = z.enum(["active", "inactive", "terminated"]);
const GenderEnum = z.enum(["male", "female", "other"]);
const MaritalStatusEnum = z.enum(["single", "married", "divorced", "widowed"]);
const DegreeLevelEnum = z.enum([
  "Diploma",
  "Bachelor",
  "Master",
  "PhD",
  "Other",
]);
const DocumentTypeEnum = z.enum(["Resume", "Aadhar", "PAN", "Degree", "Other"]);

export const createUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  role: RoleEnum.default("employee"),
});

export const createPersonalDetails = z.object({
  user_id: z.number(),
  full_name: z.string(),
  father_name: z.string(),
  gender: GenderEnum,
  date_of_birth: z.date(),
  marital_status: MaritalStatusEnum,
  address_line1: z.string(),
  address_line2: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  country: z.string(),
  emergency_contact_name: z.string(),
  emergency_contact_number: z.string(),
});

export const createQualificationDetails = z.object({
  user_id: z.number(),
  degree_level: DegreeLevelEnum,
  degree_name: z.string(),
  institution_name: z.string(),
  specialization: z.string(),
  start_year: z.number(),
  end_year: z.number(),
  grade: z.string(),
  document_url: z.string(),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// export const SalaryMasterInputSchema = z.object({});

export const documentCreateSchema = z.object({
  user_id: z.number(),
  document_type: DocumentTypeEnum,
  document_name: z.string().optional(),
  document_url: z.string(),
  verified: z.boolean().optional(),
});
