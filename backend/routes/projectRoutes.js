import express from "express";
import { getProjects, getProjectById, createProject } from "../controllers/projectController.js";

const router = express.Router();

router.route("/").get(getProjects).post(createProject);
router.route("/:id").get(getProjectById);

export default router;
