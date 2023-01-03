import express from "express";
import ordersRouter from "./orders/ordersRouter.js";
import productsRouter from "./products/productsRouter.js";
import usersRouter from "./users/usersRouter.js";

const api = express.Router();

api.use("/products", productsRouter);
api.use("/users", usersRouter);
api.use("/orders", ordersRouter);

export default api;
