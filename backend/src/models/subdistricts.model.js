import { model, Schema } from "mongoose";
const SubDistrictSchema = new Schema(
  {
    _id: { type: String, required: true },
    name_en: { type: String, required: true },
    district_code: { type: String, required: true, ref: "districts" },
    is_active: { type: Boolean, default: true },
  },
  { collection: "subdistricts", versionKey: false }
);
SubDistrictSchema.index({ district_code: 1 });
export const SubDistrict = model("SubDistrict", SubDistrictSchema);
