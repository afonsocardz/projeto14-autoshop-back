import { Category } from "../schemas/Product.js";

export default async function validateCategory(req, res, next) {
    const category = req.body;
    try {
        const { error } = Category.validate(category, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => {
                switch (err.path[0]) {
                    case "name":
                        return { text: "Nome Inválido", label: err.path[0] };
                    case "image":
                        return { text: "URL Inválida", label: err.path[0] };
                }
            });
            res.status(422).send(errors);
        } else {
            next();
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("validateBrand:\n" + err);
    }
}