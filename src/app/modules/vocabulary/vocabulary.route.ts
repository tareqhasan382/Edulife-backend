import express from "express";
import { vocabularyController } from "./vocabulary.controller";

const router = express.Router();

router.post("/create", vocabularyController.createVocabulary);
router.get("/:lessonNo", vocabularyController.getNumberVocabulary);
router.get("/", vocabularyController.allVocabulary);

export const VocabularyRoutes = router;
