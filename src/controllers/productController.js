import db from "../databases/mongo.js";

async function createProduct(req, res) {
    const product = req.body;
    try {
        await db.collection("products").insertOne(product);
        res.status(201).send(product);

    } catch (err) {
        console.log(err);
        res.status(500).send("createProduct:\n"+ err);
    }

}

async function createBrand(req,res){
    const brand = req.body;
    try{
        await db.collection("brands").insertOne(brand);
        res.status(201).send(brand);
    } catch (err) {
        console.log(err);
        res.status(500).send("createBrand:\n"+ err);
    }
}

export { createProduct, createBrand };