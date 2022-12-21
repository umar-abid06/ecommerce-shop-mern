import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import {
  httpAuthUser,
  httpGetUserProfile,
  httpRegisterUser,
} from "./usersController.js";

const usersRouter = express.Router();

usersRouter.post("/", httpRegisterUser);
usersRouter.post("/login", httpAuthUser);
usersRouter.get("/profile", protect, httpGetUserProfile);

export default usersRouter;
