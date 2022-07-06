import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import {userRoute} from "./routes/userRoute.js"

dotenv.config()
const PORT = process.env.PORT;
const app = express();
app.use(json());
app.use(cors());

app.use(userRoute);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})

