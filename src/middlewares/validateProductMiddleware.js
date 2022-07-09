import { ObjectId } from "mongodb";
import mapErrors from "../controllers/errorMapper.js";
import db from "../databases/mongo.js";
import { Product } from "../schemas/Product.js";


export default async function validateProduct(req, res, next) {
    const product = req.body;
    try {
        const { error } = Product.validate(product, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => mapErrors(err));

            res.status(422).send(errors);

        } else {
            next();
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("validateProduct:\n"+ err);
    }
}

export async function validateProductById(req, res, next) {
    const { id } = req.body;

    try {
        const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
        if(product) {
            res.locals.product = product;
            next();
        } else {
            res.status(404).send("");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("validateProductById\n"+ err);
    }
}