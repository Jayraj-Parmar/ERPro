import { model, Schema } from "mongoose";

const taxRateSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    rate: { type: Number, required: true, min: 0, max: 100 },
    // Status & Soft Delete
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date },
    // Creator
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

taxRateSchema.index(
  { name: 1 },
  {
    unique: true,
    collation: { locale: "en", strength: 2 },
    partialFilterExpression: { is_deleted: false },
  }
);

export const TaxRate = model("TaxRate", taxRateSchema);
