import { Router } from "express";
import { createUser, loginUser, addProductToCart, addProductToFavorites } from "../controllers/userController.js";
import { validateLogin } from "../middlewares/validateLoginMiddleware.js";
import { validateProductById } from "../middlewares/validateProductMiddleware.js";
import { validateToken } from "../middlewares/validateTokenMiddleware.js";
import validateUser from "../middlewares/validateUserMiddleware.js";
 

export const userRoute = Router();

userRoute.post("/signup", validateUser, createUser);
userRoute.post("/login", validateLogin, loginUser);
userRoute.post("/user/cart", validateToken, validateProductById, addProductToCart);
userRoute.post("/user/favorites", validateToken, validateProduct, addProductToFavorites);

