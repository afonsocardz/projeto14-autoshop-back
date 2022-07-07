import db from "../databases/mongo.js";

async function createProduct(req, res) {
    const product = req.body;
    try {
        await db.collection("products").insertOne(product);
        res.status(201).send(product);

    } catch (err) {
        console.log(err);
    }

}

export { createProduct };