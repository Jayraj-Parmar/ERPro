import { TaxRate } from "../models/taxrate.model.js";
import { generateCrudRoutes } from "./crud.routes.js";

export default generateCrudRoutes(TaxRate, "Tax Rate");
