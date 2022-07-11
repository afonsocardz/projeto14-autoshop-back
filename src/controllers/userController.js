import db from "../databases/mongo.js"
import bcrypt from "bcrypt";
import * as jose from "jose";


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
    const login = res.locals.login;
    
    try {
        const findUser = await db.collection("users").findOne({email:login.email});
        console.log(findUser)
        if (!findUser) {
            res.status(404).send([{ text: "Usuário não encontrado!" }]);
        } else {
            if (bcrypt.compareSync(login.password, findUser.password)) {
                const { publicKey, privateKey } = await jose.generateKeyPair('ES256K')
                const spkiPem = await jose.exportSPKI(publicKey)
                const token = await new jose.SignJWT({ 'urn:example:claim': true })
                    .setProtectedHeader({ alg: 'ES256K' })
                    .setIssuedAt()
                    .setIssuer('urn:example:issuer')
                    .setAudience('urn:example:audience')
                    .setExpirationTime('10m')
                    .sign(privateKey);
                await db.collection("sessions").insertOne({ key: spkiPem, token })
                res.status(200).send([{ user: findUser.name, text: "Login feito com sucesso", label: "success", token }]);
            } else {
                res.status(401).send([{text: "E-mail ou senha inválidos"}])
            }
        }
    } catch (err) {
        if (err.code) {
            return res.status(401).send("não!" + err.code);
        }
        res.status(500).send("loginUser: \n" + err);
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