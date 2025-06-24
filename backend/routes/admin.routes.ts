import express from "express";
import {
  addDocument,
  addEmployeeQualificationData,
  addPersonalDetails,
  createNewUser,
  getAllUsers,
  getDocument,
  getEmployeeQualificationData,
  getPersonalDetailsForOneEmployee,
  testForAdmin,
} from "../controllers/admin.controller.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all users or Create a New User
router.route("/users").get(getAllUsers).post(createNewUser);

// Testing restrictTo
router.get("/users/test", protect, restrictTo("admin"), testForAdmin);

// Add & Get personal details for a user
router
  .route("/users/:id/personal-detail")
  .post(protect, restrictTo("admin"), addPersonalDetails)
  .get(protect, restrictTo("admin"), getPersonalDetailsForOneEmployee);

// Add & Get qualification details for a user
router
  .route("/users/:id/qualification-detail")
  .post(protect, restrictTo("admin"), addEmployeeQualificationData)
  .get(protect, restrictTo("admin"), getEmployeeQualificationData);

// Add & Get documents
router
  .route("/users/:id/documents")
  .post(protect, restrictTo("manager", "admin"), addDocument)
  .get(protect, restrictTo("admin", "manager"), getDocument);

export default router;
