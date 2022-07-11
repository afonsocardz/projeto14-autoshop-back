import express, { json } from "express";
import cors from "cors";
import { userRoute } from "./routes/userRoute.js"
import { productRoute } from "./routes/productRoute.js"
import userAuth from "./middlewares/userAuthMiddleware.js";

const PORT = process.env.PORT;
const app = express();
app.use(json());
app.use(cors());

app.use(userRoute);
app.use(userAuth, productRoute);

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})

