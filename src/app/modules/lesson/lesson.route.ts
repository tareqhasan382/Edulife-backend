import express from "express";
import { lessonController } from "./lesson.controller";

const router = express.Router();

router.post("/create", lessonController.createLesson);
router.get("/", lessonController.allLesson);

export const LessonRoutes = router;
