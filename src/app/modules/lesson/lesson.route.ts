import express from "express";
import { lessonController } from "./lesson.controller";
import { authVerify } from "../../middlewares/authVerify";
import { USER_Role } from "../users/user.constants";

const router = express.Router();

router.post(
  "/create",
  authVerify(USER_Role.ADMIN),
  lessonController.createLesson
);
router.get(
  "/",
  authVerify(USER_Role.ADMIN, USER_Role.USER),
  lessonController.allLesson
);
router.get(
  "/:id",
  authVerify(USER_Role.ADMIN, USER_Role.USER),
  lessonController.singleLesson
);
router.delete(
  "/:id",
  authVerify(USER_Role.ADMIN),
  lessonController.deleteLesson
);
export const LessonRoutes = router;
