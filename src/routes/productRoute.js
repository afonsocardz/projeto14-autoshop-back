import { Router } from "express";
import { createProduct } from "../controllers/productController.js";
import validateProduct from "../middlewares/validateProductMiddleware.js";

const productRoute = Router();

productRoute.post("/product", validateProduct, createProduct);

export { productRoute };