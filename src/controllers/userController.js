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

export { createUser };