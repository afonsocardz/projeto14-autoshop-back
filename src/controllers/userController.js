import { User } from "../schemas/User.js";
//import db from "../databases/mongo.js"

async function createUser(req, res) {
    try {
        //db.collection("users").insertOne();
        res.status(200).send([{ text: "Usuário criado com sucesso!" }]);
    } catch (err) {
        console.log(err);
        res.status(500).send("createUser: \n" + err);
    }
}

async function loginUser(req, res) {
    const { email } = res.locals.login;

    try {
        //const findUser = await db.collection("users").findOne({ email });
        if (findUser) {
            res.status(200).send(findUser);
        } else {
            res.status(404).send([{ text: "Usuário não encontrado!" }]);
        }
    } catch (err) {
        res.status(500).send("loginUser: \n" + err)
    }
}

export { createUser, loginUser };