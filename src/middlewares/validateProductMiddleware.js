import { Product } from "../schemas/Product.js";


export default async function validateProduct(req, res, next) {
    const product = req.body;
    try {
        const { error } = Product.validate(product, { abortEarly: false });
        if (error) {
            const errors = error.details.map(err => {
                switch (err.path[0]) {
                    case "name":
                        return { text: "Nome Inválido", label: err.path[0] };
                    case "description":
                        return { text: "Descrição Inválida", label: err.path[0] };
                    case "currency_symbol":
                        return { text: "Moeda Inválida", label: err.path[0] };
                    case "price":
                        return { text: "Preço Inválido", label: err.path[0] };
                    case "sku":
                        return { text: "Código Inválido", label: err.path[0] };
                    case "image":
                        return { text: "URL Inválida", label: err.path[0] };
                    case "categoryId":
                        return { text: "Categoria Inválida", label: err.path[0] };
                    case "brandId":
                        return { text: "Marca Inválida", label: err.path[0] };
                }
            });

            res.status(422).send(errors);

        } else {
            next();
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("validateProduct: " + err);
    }
}