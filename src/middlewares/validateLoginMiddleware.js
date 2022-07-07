import Login from '../schemas/Login.js';

export async function validateLogin(req, res, next) {
    const login = req.body;
    const { error } = Login.validate(login, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => {
            switch (err.path[0]) {
                case "email":
                    return { text: "Email inválido", label: err.path[0] };
                case "password":
                    return { text: "Senha inválida", label: err.path[0] };
            }
        });
        return res.status(422).send(errors);
    }
    res.locals.login = login;
    next();
}