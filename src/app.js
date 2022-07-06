import express , {json} from "express";
import dotenv from "dotenv";

dotenv.config()
const app = express();
app.use(json());
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + PORT);
})

