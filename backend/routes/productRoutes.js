import express, { Router } from "express";
const router = express.Router();
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// @desc: Fetch all products
// @route: GET /api/products
// @access: Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
  })
);

// @desc: Fetch single product
// @route: GET /api/product/:id
// @access: Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error(`Product not found`);
    }
  })
);

export default router;
