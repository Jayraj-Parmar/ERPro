import { Warehouse } from "../models/warehouse.model.js";
import { generateCrudRoutes } from "./crud.routes.js";

export default generateCrudRoutes(Warehouse, "Warehouse");
