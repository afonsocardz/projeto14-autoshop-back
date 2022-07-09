export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    //validação do token...
    res.locals.token = token
    next();
}