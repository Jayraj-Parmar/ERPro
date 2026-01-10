const purchaseSchema = new Schema(
  {
    supplier_id: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    invoice_number: { type: String, trim: true },
    purchase_date: { type: Date, required: true },

    items: {
      type: [purchaseItemSchema],
      required: true,
      validate: [(v) => v.length > 0, "At least one item is required"],
    },

    // Totals
    sub_total: { type: Number, required: true, min: 0 },
    discount_total: { type: Number, default: 0, min: 0 },
    tax_total: { type: Number, default: 0, min: 0 },
    round_off: { type: Number, default: 0 },
    grand_total: { type: Number, required: true, min: 0 },

    // Payment
    payment_type: {
      type: String,
      enum: ["cash", "upi", "bank", "credit"],
      default: "cash",
    },
    paid_amount: { type: Number, default: 0, min: 0 },
    due_amount: { type: Number, required: true, min: 0 },

    // Status control
    status: {
      type: String,
      enum: ["draft", "active", "cancelled"],
      default: "active",
    },

    remarks: { type: String, trim: true },

    // Soft delete
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date },

    // Audit
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Purchase = model("Purchase", purchaseSchema);
