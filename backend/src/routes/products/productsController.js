import Product from "../../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc Fetch All Products
// @route Get /api/products/
// @access Public
export const httpGetAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error("No Products Found!");
  }
});

// @desc Fetch Single Product
// @route Get /api/products/:id
// @access Public
export const httpGetSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404).json({ message: "Product not Found!" });
    // throw new Error("Product Not Found!");
  }
});
