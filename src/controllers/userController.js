import db from "../databases/mongo.js"
import bcrypt from "bcrypt";
import * as jose from "jose";


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

    const { publicKey, privateKey } = await jose.generateKeyPair('ES256K')
    const spkiPem = await jose.exportSPKI(publicKey)
    console.log(spkiPem);

    const token = await new jose.SignJWT({ 'urn:example:claim': true })
        .setProtectedHeader({ alg: 'ES256K' })
        .setIssuedAt()
        .setIssuer('urn:example:issuer')
        .setAudience('urn:example:audience')
        .setExpirationTime('10m')
        .sign(privateKey);

    try {
        const findUser = await db.collection("users").findOne({ email });
        if (findUser) {
            res.status(200).send([{ user: findUser.name, text: "Login feito com sucesso", label: "success", token, spkiPem }]);
        } else {
            res.status(404).send([{ text: "Usuário não encontrado!" }]);
        }
    } catch (err) {
        if (err.code) {
            return res.status(401).send("não!" + err.code);
        }
        res.status(500).send("loginUser: \n" + err)
    }
}

export { createUser, loginUser };