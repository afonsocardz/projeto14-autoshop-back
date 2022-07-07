import mapErrors from "../controllers/errorMapper.js";
import { User } from "../schemas/User.js";


export default async function validateUser(req, res, next) {
    const { name, email, password } = req.body;
    const userObj = { name, email, password };
    const { value, error } = User.validate(userObj, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => mapErrors(err));
        res.status(422).send(errors);
    } else {
        res.locals.user = userObj;
        next();
    }
}