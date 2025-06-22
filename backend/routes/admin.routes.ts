import express from "express";
import { createNewUser, getAllUsers } from "../controllers/admin.controller.js";

const router = express.Router();

router.route("/users").get(getAllUsers).post(createNewUser);

export default router;
