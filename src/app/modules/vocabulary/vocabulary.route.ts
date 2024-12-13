import express from "express";
import { vocabularyController } from "./vocabulary.controller";
import { authVerify } from "../../middlewares/authVerify";
import { USER_Role } from "../users/user.constants";

const router = express.Router();

router.post(
  "/create",
  authVerify(USER_Role.ADMIN),
  vocabularyController.createVocabulary
);
router.get(
  "/:lessonNo",
  authVerify(USER_Role.ADMIN, USER_Role.USER),
  vocabularyController.getNumberVocabulary
);
router.get(
  "/getById/:id",
  authVerify(USER_Role.ADMIN, USER_Role.USER),
  vocabularyController.singleVocabulary
);
router.get("/", vocabularyController.allVocabulary);
router.delete(
  "/:id",
  authVerify(USER_Role.ADMIN),
  vocabularyController.deleteVocabulary
);

export const VocabularyRoutes = router;
