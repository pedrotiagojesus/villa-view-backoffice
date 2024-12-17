import Joi from "joi";

const createParishSchema = Joi.object({
    district_id: Joi.number().integer().required(),
    county_id: Joi.number().integer().required(),
    name: Joi.string().required().allow(null).default(null),
});

export { createParishSchema };
