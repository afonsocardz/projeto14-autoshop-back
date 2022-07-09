import { Router } from "express";
import { createProduct, createBrand, createCategory, getAllProducts } from "../controllers/productController.js";
import validateBrand from "../middlewares/validateBrandMiddleware.js";
import validateCategory from "../middlewares/validateCategoryMiddleware.js";
import validateProduct from "../middlewares/validateProductMiddleware.js";

const productRoute = Router();

productRoute.get("/products", getAllProducts);
productRoute.post("/product", validateProduct, createProduct);
productRoute.post("/product/brand", validateBrand, createBrand);
productRoute.post("/product/category", validateCategory, createCategory);

export { productRoute };