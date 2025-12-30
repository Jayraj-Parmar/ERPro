import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import { userAuth } from "./middlewares/userAuth.js";
//routes import
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.routes.js";
import categoryRouter from "./routes/category.routes.js";
import brandRouter from "./routes/brand.routes.js";
import taxrateRouter from "./routes/taxrate.routes.js";
import unitRouter from "./routes/unit.routes.js";
import warehouseRouter from "./routes/warehouse.routes.js";
import locationRouter from "./routes/location.routes.js";
import customerRouter from "./routes/customer.routes.js";
import supplierRouter from "./routes/supplier.routes.js";

//routes declaration
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", userAuth, productRouter);
app.use("/api/category", userAuth, categoryRouter);
app.use("/api/brand", userAuth, brandRouter);
app.use("/api/taxrate", userAuth, taxrateRouter);
app.use("/api/unit", userAuth, unitRouter);
app.use("/api/warehouse", userAuth, warehouseRouter);
app.use("/api/location", userAuth, locationRouter);
app.use("/api/customer", userAuth, customerRouter);
app.use("/api/supplier", userAuth, supplierRouter);

export { app };
