import { Router } from "express";
import { createProduct, getAllProducts, getProductById } from "../controllers/productController.js";
import validateProduct from "../middlewares/validateProductMiddleware.js";

const productRoute = Router();

productRoute.get("/products", getAllProducts);
productRoute.get("/products/:productId", getProductById)
productRoute.post("/product", validateProduct, createProduct);

export { productRoute };