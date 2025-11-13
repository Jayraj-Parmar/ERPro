import { Category } from "../models/category.model.js";
import { generateCrudRoutes } from "./crud.routes.js";

export default generateCrudRoutes(Category, "Category");
