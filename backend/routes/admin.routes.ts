import express from "express";
import {
  createNewUser,
  getAllUsers,
  testForAdmin,
} from "../controllers/admin.controller.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/users").get(getAllUsers).post(createNewUser);

router.get("/users/test", protect, restrictTo("admin"), testForAdmin);

export default router;
