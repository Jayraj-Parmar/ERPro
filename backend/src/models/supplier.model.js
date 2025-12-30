import { model, Schema } from "mongoose";

const supplierSchema = new Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, trim: true },
    company_name: { type: String, trim: true },
    // Contact
    contact_number: { type: String, required: true, trim: true, unique: true },
    whatsapp_number: { type: String, trim: true },
    email: { type: String, trim: true },
    // GST
    gst_number: { type: String, trim: true },
    // Address
    address: { type: String, trim: true },
    district: { type: String, trim: true },
    subdistrict: { type: String, trim: true },
    village: { type: String, trim: true },
    // Balance
    opening_balance: { type: Number, required: true, default: 0, min: 0 },
    current_balance: {
      type: Number,
      required: true,
      default: function () {
        return this.opening_balance;
      },
      min: 0,
    },
    // Status
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    // Soft delete
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date },
    // Creator
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

supplierSchema.set("toJSON", { virtuals: true });
supplierSchema.set("toObject", { virtuals: true });

supplierSchema.virtual("name").get(function () {
  if (!this.first_name && !this.last_name) return "";
  return `${this.first_name ?? ""} ${this.last_name ?? ""}`.trim();
});

supplierSchema.index(
  { gst_number: 1 },
  {
    unique: true,
    partialFilterExpression: {
      is_deleted: false,
      gst_number: { $exists: true, $ne: null },
    },
  }
);

supplierSchema.index(
  { whatsapp_number: 1 },
  {
    unique: true,
    partialFilterExpression: {
      is_deleted: false,
      whatsapp_number: { $exists: true, $ne: null },
    },
  }
);

supplierSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      is_deleted: false,
      email: { $exists: true, $ne: null },
    },
  }
);

export const Supplier = model("Supplier", supplierSchema);
