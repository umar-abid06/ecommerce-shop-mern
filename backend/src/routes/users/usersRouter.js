import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import {
  httpAuthUser,
  httpGetUserProfile,
  httpRegisterUser,
  httpUpdateUserProfile,
} from "./usersController.js";

const usersRouter = express.Router();

usersRouter.post("/", httpRegisterUser);
usersRouter.post("/login", httpAuthUser);
usersRouter.get("/profile", protect, httpGetUserProfile);
usersRouter.put("/profile", protect, httpUpdateUserProfile);

export default usersRouter;
