import { Router } from "express";
import { CRUDController } from "../controllers/crud.controller.js";

export const generateCrudRoutes = (Model, modelName) => {
  const router = Router();
  const controller = new CRUDController(Model, modelName);

  router.route("/").post(controller.create).get(controller.getAll);
  router.route("/:id").put(controller.update).delete(controller.remove);

  return router;
};
