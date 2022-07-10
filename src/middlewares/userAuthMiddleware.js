import * as jose from "jose";
async function userAuth(req, res, next) {
  const { authorization } = req.headers;
  const { token, publicKey: spkiPem } = authorization;

  try {
    const ecPublicKey = await jose.importSPKI(spkiPem);
    console.log(ecPublicKey);
    const { payload } = await jose.jwtVerify(token?.replace("Bearer ", ""), ecPublicKey, {
      issuer: 'urn:example:issuer',
      audience: 'urn:example:audience',
    })

    res.status(200).send([{ text: 'Login feito com sucesso!', label: 'auth', payload }]);
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