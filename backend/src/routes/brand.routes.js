import { Brand } from "../models/brand.model.js";
import { generateCrudRoutes } from "./crud.routes.js";

export default generateCrudRoutes(Brand, "Brand");
