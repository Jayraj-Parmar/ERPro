import { Schema, model } from "mongoose";

const purchaseItemSchema = new Schema(
  {
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // Snapshot fields
    product_name: { type: String, required: true },

    purchase_price_without_tax: { type: Number, required: true, min: 0 },
    purchase_price_with_tax: { type: Number, required: true, min: 0 },

    sale_price_without_tax: { type: Number, required: true, min: 0 },
    sale_price_with_tax: { type: Number, required: true, min: 0 },

    quantity: { type: Number, required: true, min: 0 },

    discount_type: {
      type: String,
      enum: ["percentage", "amount"],
      default: "percentage",
    },
    discount_value: { type: Number, default: 0, min: 0 },

    tax_rate_id: { type: Schema.Types.ObjectId, ref: "TaxRate" },

    batch_number: { type: String, default: null },

    manufacture_date: { type: Date },
    expiry_date: { type: Date },

    line_total: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);
