import express from "express";
import productsRouter from "./products/productsRouter.js";

const api = express.Router();

api.use("/products", productsRouter);

export default api;
