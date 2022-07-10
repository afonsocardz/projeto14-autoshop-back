import { ObjectId } from 'mongodb';
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

async function createCategory(req,res){
    const category = req.body;
    try{
        await db.collection("categories").insertOne(category);
        res.status(201).send([{text: "Categoria cadastrada com sucesso",  label: "success"}]);
    } catch (err) {
        console.log(err);
        res.status(500).send("createBrand:\n"+ err);
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await db.collection("products").find().toArray();
        res.status(200).send(products);
    } catch (err) {
        console.log(err);
        res.status(500).send("getAllProducts:\n"+ err);
    }
}
async function getProductById(req, res) {
    const { productId } = req.params;
    try {
        const product = await db.collection("products").findOne({ _id: new ObjectId(productId)});
        if (product) {
            res.status(200).send(product);
        } else {
            res.status(404).send("");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("getProductById:\n"+ err);
    }
}

export { createProduct, createBrand, createCategory, getAllProducts, getProductById };
