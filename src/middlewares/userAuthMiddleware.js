import * as jose from "jose";
import db from "../databases/mongo.js";

async function userAuth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  try {
    const { key } = await db.collection("sessions").findOne({ token })
    const ecPublicKey = await jose.importSPKI(key);

    const { payload } = await jose.jwtVerify(token, ecPublicKey, {
      issuer: 'urn:example:issuer',
      audience: 'urn:example:audience',
    })
    res.locals.payload = payload;
    next();

  } catch (err) {
    if (err.code) {
      res.status(401).send([{ text: 'Sessão expirada', label: 'expired' }])
    } else {
      res.status(500).send(`userAuth:\n${err}`);
    }
  }
}

export default userAuth;