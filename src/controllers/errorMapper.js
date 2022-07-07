export default function mapErrors(err) {
    switch (err.path[0]) {
        case "email":
            return { text: "Email inválido", label: err.path[0] };
        case "password":
            return { text: "Senha inválida", label: err.path[0] };
        case "name":
            return { text: "Nome Inválido", label: err.path[0] };
        case "image":
            return { text: "URL Inválida", label: err.path[0] };
        case "description":
            return { text: "Descrição Inválida", label: err.path[0] };
        case "currency_symbol":
            return { text: "Moeda Inválida", label: err.path[0] };
        case "price":
            return { text: "Preço Inválido", label: err.path[0] };
        case "sku":
            return { text: "Código Inválido", label: err.path[0] };
        case "categoryId":
            return { text: "Categoria Inválida", label: err.path[0] };
        case "brandId":
            return { text: "Marca Inválida", label: err.path[0] };
        default:
            return { text: "Campo Inválido", label: err.path[0] };
    }
}