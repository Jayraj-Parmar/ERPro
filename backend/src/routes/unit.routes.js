import { Unit } from "../models/unit.model.js";
import { generateCrudRoutes } from "./crud.routes.js";

export default generateCrudRoutes(Unit, "Unit");
