import { model, Schema } from "mongoose";
const VillageSchema = new Schema(
  {
    _id: { type: String, required: true },
    name_en: { type: String, required: true },
    subdistrict_code: { type: String, required: true, ref: "subdistricts" },
    is_active: { type: Boolean, default: true },
  },
  { collection: "villages", versionKey: false }
);
VillageSchema.index({ subdistrict_code: 1 });
export const Village = model("Village", VillageSchema);
