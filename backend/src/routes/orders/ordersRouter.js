import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import { httpAddOrderItems } from "./ordersController.js";

const ordersRouter = express.Router();

ordersRouter.post("/", protect, httpAddOrderItems);

export default ordersRouter;
