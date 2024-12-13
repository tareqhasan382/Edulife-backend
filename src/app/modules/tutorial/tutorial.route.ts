import express from "express";
import { tutorialController } from "./tutorial.controller";
import { authVerify } from "../../middlewares/authVerify";
import { USER_Role } from "../users/user.constants";

const router = express.Router();

router.post(
  "/create",
  authVerify(USER_Role.ADMIN),
  tutorialController.createTutorial
);
router.get(
  "/:id",
  authVerify(USER_Role.ADMIN, USER_Role.USER),
  tutorialController.getbyIdTutorial
);
router.get(
  "/",
  authVerify(USER_Role.ADMIN, USER_Role.USER),
  tutorialController.allTutorial
);
router.delete(
  "/:id",
  authVerify(USER_Role.ADMIN),
  tutorialController.deleteTutorial
);

export const TutorialRoutes = router;
