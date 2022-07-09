import { Router } from "express";
import { createProduct, createBrand, getAllProducts, getProductById } from "../controllers/productController.js";
import validateBrand from "../middlewares/validateBrandMiddleware.js";
import validateProduct from "../middlewares/validateProductMiddleware.js";

const productRoute = Router();

productRoute.get("/products", getAllProducts);
productRoute.get("/products/:productId", getProductById)
productRoute.post("/product", validateProduct, createProduct);
productRoute.post("/product/brand", validateBrand, createBrand);

export { productRoute };