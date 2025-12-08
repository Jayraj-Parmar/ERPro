import { Schema, model } from "mongoose";

const productBatchSchema = new Schema(
  {
    // Link to product
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },

    // If this batch came from a purchase
    purchase_id: {
      type: Schema.Types.ObjectId,
      ref: "Purchase",
      default: null,
    },

    // Purchase prices for this batch (must remain unchanged forever)
    purchase_price_without_tax: { type: Number, required: true, min: 0 },
    purchase_price_with_tax: { type: Number, required: true, min: 0 },

    // Sale prices for this batch (snapshot at time of purchase)
    sale_price_without_tax: { type: Number, required: true, min: 0 },
    sale_price_with_tax: { type: Number, required: true, min: 0 },

    // Quantity added from opening stock or purchase
    quantity_added: { type: Number, required: true, min: 0 },

    // Remaining quantity today (after sales deduction)
    quantity_left: { type: Number, required: true, min: 0 },

    // Batch number
    batch_number: { type: String, default: null },

    // Date when this batch entered stock
    purchase_date: { type: Date, required: true },

    // Expiry info (useful for medical & FMCG)
    manufacture_date: { type: Date },
    expiry_date: { type: Date },
  },
  { timestamps: true }
);

productBatchSchema.index({ product_id: 1, purchase_date: 1 });

export const ProductBatch = model("ProductBatch", productBatchSchema);
