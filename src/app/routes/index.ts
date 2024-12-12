import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { LessonRoutes } from "../modules/lesson/lesson.route";
import { VocabularyRoutes } from "../modules/vocabulary/vocabulary.route";
import { TutorialRoutes } from "../modules/tutorial/tutorial.route";

const router = express.Router();

router.use("/auth", UserRoutes);
router.use("/lesson", LessonRoutes);
router.use("/vocabulary", VocabularyRoutes);
router.use("/tutorial", TutorialRoutes);

export default router;
