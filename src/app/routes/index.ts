import express from "express";
import { UserRoutes } from "../modules/users/user.route";

const router = express.Router();

router.use("/auth", UserRoutes);

export default router;
