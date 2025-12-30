import { Router } from "express";
import { partyController } from "../controllers/party.controller.js";
import { Customer } from "../models/customer.model.js";
import { partyValidator } from "../validators/partyValidator.js";
import { validator } from "../middlewares/validateRequest.js";
import { CRUDController } from "../controllers/crud.controller.js";

const router = Router();

const customerController = new partyController(Customer, "Customer");
const controller = new CRUDController(Customer, "Customer");

router
  .route("/")
  .post(partyValidator, validator, customerController.createParty)
  .get(controller.getAll);
router
  .route("/:id")
  .delete(customerController.removeParty)
  .put(customerController.updateParty);

export default router;
