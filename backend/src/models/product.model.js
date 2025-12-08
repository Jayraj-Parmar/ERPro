import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    category_id: { type: Schema.Types.ObjectId, ref: "Category" },
    brand_id: { type: Schema.Types.ObjectId, ref: "Brand" },
    warehouse_location_id: { type: Schema.Types.ObjectId, ref: "Warehouse" },

    // Default sale price (for future purchases/batches)
    default_sale_price_without_tax: { type: Number, min: 0 },
    default_sale_price_with_tax: { type: Number, min: 0 },

    // Opening Stock & purchase prices
    opening_stock: { type: Number, default: 0, min: 0 },
    opening_purchase_price_without_tax: { type: Number, min: 0 },
    opening_purchase_price_with_tax: { type: Number, min: 0 },
    opening_stock_date: { type: Date },

    // After first purchase → opening stock cannot be edited
    opening_locked: { type: Boolean, default: false },

    //Discount
    discount_type: {
      type: String,
      enum: ["none", "percentage", "amount"],
      default: "none",
    },
    discount_percentage: { type: Number, default: 0, min: 0, max: 100 },
    discount_amount: { type: Number, default: 0, min: 0 },

    tax_rate_id: { type: Schema.Types.ObjectId, ref: "TaxRate" },

    // minimum and re-order stock
    minimum_order_quantity: { type: Number, default: 0, min: 0 },
    reorder_level: { type: Number, required: true, default: 0, min: 0 },

    // Manufacture and Expiry Date
    manufacture_date: { type: Date },
    expiry_date: { type: Date },

    // Unit
    purchase_unit: { type: Schema.Types.ObjectId, ref: "Unit" },
    sale_unit: { type: Schema.Types.ObjectId, ref: "Unit" },
    conversion_factor: { type: Number, default: 1 },

    // Status
    status: { type: String, enum: ["active", "inactive"], default: "active" },

    // Soft delete
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date },

    // image_url: { type: String, trim: true },
    // barcode: { type: String, required: true, unique: true, trim: true },

    // Creator
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
