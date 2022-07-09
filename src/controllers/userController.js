import db from "../databases/mongo.js"
import bcrypt from "bcrypt";

async function createUser(req, res) {
    const user = res.locals.user;
    try {
        await db.collection("users").insertOne({
            ...user, 
            password: bcrypt.hashSync(user.password, 10),
            cart: [],
            favorites: []
        });
        res.status(200).send([{ text: "Usuário criado com sucesso!" }]);
    } catch (err) {
        console.log(err);
        res.status(500).send("createUser: \n" + err);
    }
}

async function loginUser(req, res) {
    const { email, password } = res.locals.login;

    try {
        const findUser = await db.collection("users").findOne({ email });
        if (findUser && bcrypt.compareSync(password, findUser.password)) {
            res.status(200).send([{user:findUser, text:"Login feito com sucesso", label: "success"}]);
        } else if (!bcrypt.compareSync(password, findUser.password)) {
            res.status(401).send([{ text: "Senha incorreta!" }]);
        } else {
            res.status(404).send([{ text: "Usuário não encontrado!" }]);
        }
    } catch (err) {
        res.status(500).send("loginUser:\n"+ err);
    }
}

async function addProductToCart(req, res) {
    const token = res.locals.token;
    const product = res.locals.product;

    try {
        const user = await db.collection("users").findOne({ token });
        const newCart = user.cart.push(product);
        await db.collection("users").updateOne({ token }, {
            $set: {
                name: user.name,
                email: user.email,
                password: user.password,
                cart: newCart,
                favorites: user.favorites
            }
        });
        res.status(200).send(newCart);
    } catch (err) {
        console.log(err);
        res.status(500).send("addProductToCart:\n"+ err);
    }
}

async function addProductToFavorites(req, res) {
    const token = res.locals.token;
    const product = res.locals.product;

    try {
        const user = await db.collection("users").findOne({ token });
        const newFavorites = user.favorites.push(product);
        await db.collection("users").updateOne({ token }, {
            $set: {
                name: user.name,
                email: user.email,
                password: user.password,
                cart: user.cart,
                favorites: newFavorites
            }
        });
        res.status(200).send(newFavorites);
    } catch (err) {
        console.log(err);
        res.status(500).send("addProductToFavorites:\n"+ err);
    }
}

export { createUser, loginUser, addProductToCart, addProductToFavorites };