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

export { createUser };