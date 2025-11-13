import { model, Schema } from "mongoose";

const unitSchema = new Schema(
  {
    // Unit Information
    name: { type: String, required: true, trim: true, unique: true },
    short_name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    // Status & Soft Delete
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date },
    // Creator
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

unitSchema.index(
  { name: 1 },
  {
    unique: true,
    collation: { locale: "en", strength: 2 },
    partialFilterExpression: { is_deleted: false },
  }
);

export const Unit = model("Unit", unitSchema);
