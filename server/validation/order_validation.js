import joi from "joi";

export const validateOrderDetails = (orderObject) =>{
    const Schema = joi.object({
        ordeorderDetails: joi.required()
    })
    return Schema.validateAsync(orderObject)
}