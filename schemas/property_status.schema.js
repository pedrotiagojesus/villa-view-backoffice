import Joi from "joi";

const createPropertyStatusSchema = Joi.object({
    name: Joi.string().required().allow(null).default(null),
});

export { createPropertyStatusSchema };
