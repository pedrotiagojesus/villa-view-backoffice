import Joi from "joi";

const createPropertyTypeSchema = Joi.object({
    name: Joi.string().required().allow(null).default(null),
});

export { createPropertyTypeSchema };
