import { Product } from "../models/product.model.js";
import { ProductBatch } from "../models/ProductBatch.model.js";
import { TaxRate } from "../models/taxrate.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const round2 = (num) => Number(num.toFixed(2));

const addTax = (priceWithoutTax, taxPercent) =>
  round2(priceWithoutTax * (1 + taxPercent / 100));

const removeTax = (priceWithTax, taxPercent) =>
  round2(priceWithTax / (1 + taxPercent / 100));

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user?._id || data.created_by;

    // Validate sale price
    if (
      data.default_sale_price_without_tax == null &&
      data.default_sale_price_with_tax == null
    ) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            "Sale price is required (with or without tax)"
          )
        );
    }

    let taxPercent = 0;
    if (data.tax_rate_id) {
      const taxDoc = await TaxRate.findById(data.tax_rate_id);
      taxPercent = taxDoc?.rate || 0;
    }

    if (
      data.default_sale_price_without_tax != null &&
      data.default_sale_price_with_tax == null
    ) {
      data.default_sale_price_with_tax = addTax(
        Number(data.default_sale_price_without_tax),
        taxPercent
      );
    }

    if (
      data.default_sale_price_with_tax != null &&
      data.default_sale_price_without_tax == null
    ) {
      data.default_sale_price_without_tax = removeTax(
        Number(data.default_sale_price_with_tax),
        taxPercent
      );
    }

    const hasOpeningStock = Number(data.opening_stock) > 0;

    if (hasOpeningStock) {
      if (data.opening_stock_date == null) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              null,
              "Opening stock date is required when opening stock exists"
            )
          );
      }

      if (
        data.opening_purchase_price_without_tax == null &&
        data.opening_purchase_price_with_tax == null
      ) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              null,
              "Opening purchase price required when opening stock exists."
            )
          );
      }

      if (
        data.opening_purchase_price_without_tax != null &&
        data.opening_purchase_price_with_tax == null
      ) {
        data.opening_purchase_price_with_tax = addTax(
          Number(data.opening_purchase_price_without_tax),
          taxPercent
        );
      }

      if (
        data.opening_purchase_price_with_tax != null &&
        data.opening_purchase_price_without_tax == null
      ) {
        data.opening_purchase_price_without_tax = removeTax(
          Number(data.opening_purchase_price_with_tax),
          taxPercent
        );
      }

      if (
        data.default_sale_price_with_tax < data.opening_purchase_price_with_tax
      ) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              null,
              "Sale price (with tax) must be greater or equal to purchase price (with tax)"
            )
          );
      }

      if (
        data.sale_price_without_tax < data.opening_purchase_price_without_tax
      ) {
        return res
          .status(400)
          .json(
            new ApiResponse(
              400,
              null,
              "Sale price (without tax) must be greater or equal to purchase price (without tax)"
            )
          );
      }
    }

    const product = await Product.create({
      ...data,
      created_by: userId,
    });

    if (hasOpeningStock) {
      await ProductBatch.create({
        product_id: product._id,
        purchase_id: null,
        purchase_price_without_tax: data.opening_purchase_price_without_tax,
        purchase_price_with_tax: data.opening_purchase_price_with_tax,
        sale_price_without_tax: data.default_sale_price_without_tax,
        sale_price_with_tax: data.default_sale_price_with_tax,
        quantity_added: data.opening_stock,
        quantity_left: data.opening_stock,
        batch_number: "OPENING-STOCK",
        purchase_date: new Date(data.opening_stock_date),
        manufacture_date: data.manufacture_date,
        expiry_date: data.expiry_date,
      });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Product create successfully."));
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json(new ApiResponse(409, null, "Product already exists."));
    }
    throw new ApiError(500, `Unexpected error during Product creation.`);
  }
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const data = await Product.find({ is_deleted: false });
  return res
    .status(200)
    .json(new ApiResponse(200, data, `All Products fetched successfully.`));
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
