import asyncHandler from "express-async-handler";
import {
  createUserSchema,
  createPersonalDetails,
  createQualificationDetails,
  documentCreateSchema,
} from "../schema/user.schema.js";
import type { Request, Response, NextFunction } from "express";
import {
  addEmployeeQualification,
  addUserPersonalDetails,
  CreateDocument,
  createUser,
  GetDocument,
  getEmployeeQualifications,
  getSinglePersonalDetails,
  getUsers,
} from "../queries/admin.queries.js";
import { checkUser } from "../queries/auth.queries.js";
import bcrypt from "bcryptjs";
import type { z } from "zod";

type PersonalDetailsInput = z.infer<typeof createPersonalDetails>;
type QualificationDetailsInput = z.infer<typeof createQualificationDetails>;
type DocumentsInput = z.infer<typeof documentCreateSchema>;

// @desc Get all user
// @route GET /api/admin/users
// @access PRIVATE

const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const users = await getUsers();
      console.log(users);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({
        message: "Error while fetching all users.",
      });
    }
  }
);

// @desc Create a new user from CRM
// @route POST /api/admin/users
// @access PRIVATE

const createNewUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const parsed = createUserSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }

    const { username, email, password, role, phone } = parsed.data;

    const userAlreadyExists = await checkUser(email);

    if (userAlreadyExists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await createUser(username, email, hashedPassword, role, phone);
    console.log(user);

    res.status(201).json({ user });
  }
);

// @desc Test for admin
// @route GET /api/admin/users/test
// @access PRIVATE

const testForAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    res.status(200).json({
      message: "You are an admin!",
    });
  }
);

// @desc Get personal details for an employee
// @route GET /api/admin/users/:id/personal-detail
// @access PRIVATE

const getPersonalDetailsForOneEmployee = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userId = Number(req.params.id);
      const personal_details = await getSinglePersonalDetails(userId);

      if (!personal_details) {
        return res.status(404).json({
          message: "Personal details not found for this user.",
        });
      }

      return res.status(200).json({
        message: "Details fetched successfully",
        details: personal_details,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error fetching details.",
      });
    }
  }
);

// @desc Add personal details for an employee
// @route POST /api/admin/users/:id/personal-detail
// @access PRIVATE

const addPersonalDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userId = Number(req.params.id);
    console.log(typeof userId);

    const body = {
      ...req.body,
      date_of_birth: req.body.date_of_birth
        ? new Date(req.body.date_of_birth)
        : undefined,
    };

    const parsed = createPersonalDetails.safeParse({
      ...body,
      user_id: userId,
    });

    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const {
      full_name,
      father_name,
      gender,
      date_of_birth,
      marital_status,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      country,
      emergency_contact_name,
      emergency_contact_number,
    } = parsed.data;

    const data: PersonalDetailsInput = {
      user_id: userId,
      full_name,
      father_name,
      gender,
      date_of_birth,
      marital_status,
      address_line1,
      address_line2,
      city,
      state,
      pincode,
      country,
      emergency_contact_name,
      emergency_contact_number,
    };

    const details = await addUserPersonalDetails(data);
    console.log(details);

    if (!details) {
      return res.status(400).json({
        message: "Personal details not created",
      });
    }

    res.status(200).json({
      message: "Personal details successfully created",
      details: details,
    });
  }
);

// @desc Get qualification details for an employee
// @route POST /api/admin/users/:id/qualification-detail
// @access PRIVATE

const getEmployeeQualificationData = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userId = Number(req.params.id);
      const qual_details = await getEmployeeQualifications(userId);

      if (!qual_details) {
        return res.status(404).json({
          message: "Personal details not found for this user.",
        });
      }

      return res.status(200).json({
        message: "Details fetched successfully",
        details: qual_details,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error fetching details.",
      });
    }
  }
);

// @desc Add qualification details for an employee
// @route POST /api/admin/users/:id/qualification-detail
// @access PRIVATE

const addEmployeeQualificationData = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const userId = Number(req.params.id);
    console.log(typeof userId);

    const body = {
      ...req.body,
      start_year: req.body.start_year ? Number(req.body.start_year) : undefined,
      end_year: req.body.end_year ? Number(req.body.end_year) : undefined,
      degree_level: req.body.degree_level, // Make sure this matches the enum exactly
    };

    const parsed = createQualificationDetails.safeParse({
      ...body,
      user_id: userId,
    });

    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const {
      degree_level,
      degree_name,
      institution_name,
      specialization,
      start_year,
      end_year,
      grade,
      document_url,
    } = parsed.data;

    Number(start_year);

    const data: QualificationDetailsInput = {
      user_id: userId,
      degree_level,
      degree_name,
      institution_name,
      specialization,
      start_year,
      end_year,
      grade,
      document_url,
    };

    const details = await addEmployeeQualification(data);
    console.log(details);

    if (!details) {
      return res.status(400).json({
        message: "Qualification details not created",
      });
    }

    res.status(200).json({
      message: "Qualification details successfully created",
      details: details,
    });
  }
);

// @desc Add documents
// @route POST /api/admin/users/:id/documents
// @access PRIVATE

const addDocument = asyncHandler(async (req, res, next) => {
  const userId = Number(req.params.id);

  const parsed = documentCreateSchema.safeParse({
    ...req.body,
    user_id: userId,
  });

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const { document_type, document_name, document_url, verified } = parsed.data;

  const data: DocumentsInput = {
    user_id: userId,
    document_type,
    document_name,
    document_url,
    verified,
  };

  const documents = await CreateDocument(data);
  console.log(documents);

  if (!documents) {
    res.status(400).json({
      message: "Document details not created",
    });
    return;
  }

  res.status(200).json({
    message: "Document details successfully created",
    details: documents,
  });
});

// @desc Get all documents
// @route GET /api/admin/users/:id/documents
// @access PRIVATE

const getDocument = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userId = Number(req.params.id);
      const document_details = await GetDocument(userId);

      if (!document_details) {
        return res.status(404).json({
          message: "Document details not found for this user.",
        });
      }

      return res.status(200).json({
        message: "Details fetched successfully",
        details: document_details,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error fetching details.",
      });
    }
  }
);

export {
  getAllUsers,
  createNewUser,
  testForAdmin,
  addPersonalDetails,
  getPersonalDetailsForOneEmployee,
  addEmployeeQualificationData,
  getEmployeeQualificationData,
  addDocument,
  getDocument,
};
