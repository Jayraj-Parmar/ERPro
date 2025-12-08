import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { productValidator } from "../validators/productValidators.js";
import { validator } from "../middlewares/validateRequest.js";

const router = Router();

router
  .route("/")
  .post(productValidator, validator, createProduct)
  .get(getAllProducts);
router.route("/:id").put(updateProduct).delete(deleteProduct);

export default router;
