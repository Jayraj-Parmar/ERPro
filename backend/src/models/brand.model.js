import { model, Schema } from "mongoose";

const brandSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    // Contact
    contact_person: { type: String, trim: true },
    contact_number: { type: String, trim: true },
    email: { type: String, trim: true },
    website: { type: String, trim: true },
    // Status and Soft-delete
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date },
    // Creator
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },

  { timestamps: true }
);

brandSchema.index(
  { name: 1 },
  {
    unique: true,
    collation: { locale: "en", strength: 2 },
    partialFilterExpression: { is_deleted: false },
  }
);

export const Brand = model("Brand", brandSchema);
