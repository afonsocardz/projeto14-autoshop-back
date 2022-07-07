import db from "../databases/mongo.js"
import bcrypt from "bcrypt";

async function createUser(req, res) {
    const user = res.locals.user;
    try {
        await db.collection("users").insertOne({ ...user, password: bcrypt.hashSync(user.password, 10) });
        res.status(200).send([{ text: "Usuário criado com sucesso!" }]);
    } catch (err) {
        console.log(err);
        res.status(500).send("createUser: \n" + err);
    }
}

async function loginUser(req, res) {
    const { email } = res.locals.login;

    try {
        const findUser = await db.collection("users").findOne({ email });
        if (findUser) {
            res.status(200).send([{user:findUser, text:"Login feito com sucesso", label: "success"}]);
        } else {
            res.status(404).send([{ text: "Usuário não encontrado!" }]);
        }
    } catch (err) {
        res.status(500).send("loginUser: \n" + err)
    }
}

export { createUser, loginUser };