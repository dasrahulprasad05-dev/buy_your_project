import express from "express";
import { getProjects, getProjectById, createProject } from "../controllers/projectController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(getProjects).post(protect, createProject);
router.route("/:id").get(getProjectById);

export default router;
