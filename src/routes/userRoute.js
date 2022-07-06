import { Router } from "express";
import { createUser } from "../controllers/userController.js";
import validateUser from "../middlewares/validateUserMiddleware.js";
 

export const userRoute = Router();

userRoute.post("/signup", validateUser, createUser);

