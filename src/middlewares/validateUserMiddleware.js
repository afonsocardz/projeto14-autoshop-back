import { User } from "../schemas/User.js";


export default async function validateUser(req, res, next) {
    const { name, email, password } = req.body;
    const userObj = { name, email, password };
    const { value, error } = User.validate(userObj, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => {
            if (err.path[0] === "name") {
                return { text: "Nome inválido", label: err.path[0] };
            }
            if (err.path[0] === "email") {
                return { text: "Email inválido", label: err.path[0] };
            }
        })
        res.status(422).send(errors);
    } else {
        res.locals.user = userObj;
        next();
    }
}