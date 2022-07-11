import joi from "joi";

export const Product = joi.object({
    name: joi.string()
        .required(),
    currency_symbol: joi.string()
        .required(),
    description: joi.string()
        .required(),
    price: joi.number()
        .required(),
    image: joi.string()
        .required(),
    category: joi.string()
    .valid('Veiculo', 'Acessório')
        .required(),
    brand: joi.string()
    .valid("Audi" , "BMW" , "Chery" , "Chevrolet" , "Citroën" , "Fiat" , "Ford" , "Honda" , "Hyundai" , "Jeep" , "Mercedes-Benz" , "Mitsubishi" , "Nissan" , "Peugeot" , "Renault" , "Suzuki" , "Toyota" , "Volkswagen")
        .required(),
    sku: joi.string()
        .required()
});