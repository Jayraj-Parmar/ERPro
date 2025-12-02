import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    category_id: { type: Schema.Types.ObjectId, ref: "Category" },
    brand_id: { type: Schema.Types.ObjectId, ref: "Brand" },
    // image_url: { type: String, trim: true },
    // Barcode
    // barcode: { type: String, required: true, unique: true, trim: true },
    // Pricing
    purchase_price: { type: Number, required: true, min: 0 },
    sale_price: { type: Number, required: true, min: 0 },
    discount_type: {
      type: String,
      enum: ["percentage", "amount"],
      default: "percentage",
    },
    discount_percentage: { type: Number, default: 0, min: 0, max: 100 },
    discount_amount: { type: Number, default: 0, min: 0 },
    // tax_rate_id: { type: Schema.Types.ObjectId, ref: "TaxRate" },
    // Stock
    opening_stock: { type: Number, required: true, default: 0, min: 0 },
    quantity_in_stock: {
      type: Number,
      required: true,
      default: function () {
        return this.opening_stock;
      },
      min: 0,
    },
    minimum_order_quantity: { type: Number, default: 0, min: 0 },
    reorder_level: { type: Number, required: true, default: 0, min: 0 },
    // Batch and Date
    batch_number: { type: String, trim: true },
    manufacture_date: { type: Date },
    expiry_date: { type: Date },
    // Soft delete
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date },
    // Status
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    // Unit
    purchase_unit: { type: Schema.Types.ObjectId, ref: "Unit" },
    sale_unit: { type: Schema.Types.ObjectId, ref: "Unit" },
    conversion_factor: { type: Number, default: 1 },
    // Location
    warehouse_location_id: { type: Schema.Types.ObjectId, ref: "Warehouse" },
    // Creator
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
