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
    categoryId: joi.string()
        .required(),
    brandId: joi.string()
        .required(),
    sku: joi.string()
        .required()
});

export const Brand = joi.object({
    name: joi.string()
        .required(),
    image: joi.string()
        .required()
})

export const Category = joi.object({
    name: joi.string()
    .required(),
})