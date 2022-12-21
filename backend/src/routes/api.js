import express from "express";
import productsRouter from "./products/productsRouter.js";
import usersRouter from "./users/usersRouter.js";

const api = express.Router();

api.use("/products", productsRouter);
api.use("/users", usersRouter);

export default api;
