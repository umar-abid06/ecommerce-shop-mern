import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import { httpAddOrderItems, httpGetOrderById } from "./ordersController.js";

const ordersRouter = express.Router();

ordersRouter.post("/", protect, httpAddOrderItems);
ordersRouter.get("/:id", protect, httpGetOrderById);

export default ordersRouter;
