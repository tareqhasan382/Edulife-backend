import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/registration", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/users", userController.allUser);

export const UserRoutes = router;
