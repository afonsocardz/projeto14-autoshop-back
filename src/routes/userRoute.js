import { Router } from "express";
import { createUser, loginUser, addProductToCart, addProductToFavorites } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuthMiddleware.js";
import { validateLogin } from "../middlewares/validateLoginMiddleware.js";
import validateProduct, { validateProductById } from "../middlewares/validateProductMiddleware.js";
import validateUser from "../middlewares/validateUserMiddleware.js";
 

export const userRoute = Router();

userRoute.post("/signup", validateUser, createUser);
userRoute.post("/login", validateLogin, loginUser);
userRoute.post("/user/cart", userAuth, validateProductById, addProductToCart);
userRoute.post("/user/favorites", userAuth, validateProduct, addProductToFavorites);

