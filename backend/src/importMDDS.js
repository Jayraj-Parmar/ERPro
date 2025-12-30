import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import { Village } from "./models/village.model.js";
import { connectDB } from "./configs/db.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { SubDistrict } from "./models/subdistricts.model.js";
import { District } from "./models/district.model.js";

dotenv.config();

const BATCH_SIZE = 1000;
let bulkOps = [];

async function startImport() {
  await connectDB();
  console.log("MongoDB connected!!");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, "data", "Rdir_2011_24_GUJARAT.csv");

  // fs.createReadStream(filePath)
  //   .pipe(csv())
  //   .on("data", async (row) => {
  //     const villageId = row["MDDS PLCN"];
  //     const villageName = row["Area Name"];
  //     const villageSubdistrictCode = row["MDDS Sub_DT"];

  //     if (!villageId || !villageName || !villageSubdistrictCode) return;

  //     bulkOps.push({
  //       insertOne: {
  //         document: {
  //           _id: villageId,
  //           name_en: villageName,
  //           subdistrict_code: villageSubdistrictCode,
  //           is_active: true,
  //         },
  //       },
  //     });

  //     if (bulkOps.length === BATCH_SIZE) {
  //       await Village.bulkWrite(bulkOps, { ordered: false });
  //       bulkOps = [];
  //     }
  //   })
  //   .on("end", async () => {
  //     try {
  //       if (bulkOps.length > 0) {
  //         await Village.bulkWrite(bulkOps, { ordered: false });
  //       }
  //       console.log("CSV Import Completed");
  //     } catch (err) {
  //       console.error("Bulk insert error:", err.message);
  //     } finally {
  //       await mongoose.connection.close();
  //       console.log("MongoDB closed");
  //     }
  //   });

  // fs.createReadStream(filePath)
  //   .pipe(csv())
  //   .on("data", async (row) => {
  //     const subdistrictId = row["MDDS Sub_DT"];
  //     const subdistrictName = row["SUB-DISTRICT NAME"];
  //     const subdistrictDistrictCode = row["MDDS DTC"];

  //     if (!subdistrictId || !subdistrictName || !subdistrictDistrictCode)
  //       return;

  //     bulkOps.push({
  //       insertOne: {
  //         document: {
  //           _id: subdistrictId,
  //           name_en: subdistrictName,
  //           district_code: subdistrictDistrictCode,
  //           is_active: true,
  //         },
  //       },
  //     });

  //     if (bulkOps.length === BATCH_SIZE) {
  //       await SubDistrict.bulkWrite(bulkOps, { ordered: false });
  //       bulkOps = [];
  //     }
  //   })
  //   .on("end", async () => {
  //     try {
  //       if (bulkOps.length > 0) {
  //         await SubDistrict.bulkWrite(bulkOps, { ordered: false });
  //       }
  //       console.log("CSV Import Completed");
  //     } catch (err) {
  //       console.error("Bulk insert error:", err.message);
  //     } finally {
  //       await mongoose.connection.close();
  //       console.log("MongoDB closed");
  //     }
  //   });

  // fs.createReadStream(filePath)
  //   .pipe(csv())
  //   .on("data", async (row) => {
  //     const districtId = row["MDDS DTC"];
  //     const districtName = row["DISTRICT NAME"];
  //     const stateCode = row["MDDS STC"];

  //     if (!districtId || !districtName || !stateCode) return;

  //     bulkOps.push({
  //       updateOne: {
  //         filter: { _id: districtId },
  //         update: {
  //           $setOnInsert: {
  //             name_en: districtName,
  //             state_code: stateCode,
  //             is_active: true,
  //           },
  //         },
  //         upsert: true,
  //       },
  //     });

  //     if (bulkOps.length === BATCH_SIZE) {
  //       try {
  //         await District.bulkWrite(bulkOps, { ordered: false });
  //         bulkOps = [];
  //       } catch (error) {
  //         if (error.code === 11000) {
  //           console.log("Duplicate value!!");
  //         }
  //       }
  //     }
  //   })
  //   .on("end", async () => {
  //     try {
  //       if (bulkOps.length > 0) {
  //         await District.bulkWrite(bulkOps, { ordered: false });
  //       }
  //       console.log("CSV Import Completed");
  //     } catch (err) {
  //       console.error("Bulk insert error:", err.message);
  //     } finally {
  //       await mongoose.connection.close();
  //       console.log("MongoDB closed");
  //     }
  //   });
}

startImport();
