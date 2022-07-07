import Login from '../schemas/Login.js';
import mapErrors from '../controllers/errorMapper.js';

export async function validateLogin(req, res, next) {
    const login = req.body;
    const { error } = Login.validate(login, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => mapErrors(err));
        return res.status(422).send(errors);
    }
    res.locals.login = login;
    next();
}