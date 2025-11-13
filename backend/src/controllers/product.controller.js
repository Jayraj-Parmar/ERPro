import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createProduct = asyncHandler(async (req, res) => {
  const data = req.body;
  const { name } = req.body;

  const productExist = await Product.findOne({ name });

  if (productExist) {
    return res
      .status(409)
      .json(new ApiResponse(409, null, "Product is already exist."));
  }

  const createProduct = await Product.create({
    data,
    created_by: req.user?._id,
  });

  if (!createProduct) {
    throw new ApiError(
      500,
      "An unexpected error occurred during product create. Please try again."
    );
  }

  return res.json(new ApiResponse(201, null, "Product created successfully"));
});

export const getAllProducts = asyncHandler(async (req, res) => {
  //fetch all products
});

export const getProductById = asyncHandler(async (req, res) => {
  //fetch product by id
});

export const updateProduct = asyncHandler(async (req, res) => {
  //update products
});

export const deleteProduct = asyncHandler(async (req, res) => {
  //delete products
});
