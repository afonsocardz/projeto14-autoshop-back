import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import { validateLogin } from "../middlewares/validateLoginMiddleware.js";
import validateUser from "../middlewares/validateUserMiddleware.js";
 

export const userRoute = Router();

userRoute.post("/signup", validateUser, createUser);
userRoute.post("/login", validateLogin, loginUser);

