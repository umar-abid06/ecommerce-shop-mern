import express from "express";
import {
  httpGetAllProducts,
  httpGetSingleProduct,
} from "./productsController.js";

const productsRouter = express.Router();

// @desc Fetch All Products
// @route Get /api/products/
// @access Public
productsRouter.get("/", httpGetAllProducts);

// @desc Fetch Single Product
// @route Get /api/products/:id
// @access Public
productsRouter.get("/:id", httpGetSingleProduct);

export default productsRouter;
