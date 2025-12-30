import { Router } from "express";
import { partyController } from "../controllers/party.controller.js";
import { Supplier } from "../models/supplier.model.js";
import { partyValidator } from "../validators/partyValidator.js";
import { validator } from "../middlewares/validateRequest.js";
import { CRUDController } from "../controllers/crud.controller.js";

const router = Router();

const supplierController = new partyController(Supplier, "Supplier");
const controller = new CRUDController(Supplier, "Supplier");

router
  .route("/")
  .post(partyValidator, validator, supplierController.createParty)
  .get(controller.getAll);
router
  .route("/:id")
  .delete(supplierController.removeParty)
  .put(supplierController.updateParty);

export default router;
