import express from "express";
import { tutorialController } from "./tutorial.controller";

const router = express.Router();

router.post("/create", tutorialController.createTutorial);
router.get("/:id", tutorialController.getbyIdTutorial);
router.get("/", tutorialController.allTutorial);

export const TutorialRoutes = router;
