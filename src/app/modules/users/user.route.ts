import express from "express";
import { userController } from "./user.controller";
import { authVerify } from "../../middlewares/authVerify";
import { USER_Role } from "./user.constants";

const router = express.Router();

router.post("/registration", userController.createUser);
router.post("/login", userController.loginUser);
router.get(
  "/users",
  authVerify(USER_Role.ADMIN, USER_Role.USER),
  userController.allUser
);
router.patch("/:id", authVerify(USER_Role.ADMIN), userController.updateUser);

export const UserRoutes = router;
