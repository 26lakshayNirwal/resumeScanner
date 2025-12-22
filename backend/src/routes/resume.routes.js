import { Router } from "express";
import {
  uploadResume,
  getResumes,
  getResume,
  updateResume,
  deleteResume,
  downloadResume
} from "../controllers/resume.controller.js";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

router.post("/upload", auth, upload.single("resume"), uploadResume);
router.get("/", auth, getResumes);
router.get("/:id", auth, getResume);
router.put("/:id", auth, updateResume);
router.delete("/:id", auth, deleteResume);
router.get("/:id/download", auth, downloadResume);

export default router;
