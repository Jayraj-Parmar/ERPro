import { model, Schema } from "mongoose";
const DistrictSchema = new Schema(
  {
    _id: { type: String, required: true },
    name_en: { type: String, required: true },
    state_code: { type: String, required: true },
    is_active: { type: Boolean, default: true },
  },
  { collection: "districts", versionKey: false }
);
DistrictSchema.index({ state_code: 1 });
export const District = model("District", DistrictSchema);
