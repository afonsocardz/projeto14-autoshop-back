import { Brand } from "../schemas/Product.js";

export default async function validateBrand(req, res, next) {
    const brand = req.body;
    try {
        const { error } = Brand.validate(brand, { abortEarly: false });
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