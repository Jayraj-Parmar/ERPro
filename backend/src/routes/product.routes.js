import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/").post(createProduct).get(getAllProducts);
router.route("/:id").put(updateProduct).delete(deleteProduct);

export default router;
