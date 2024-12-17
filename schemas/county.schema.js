import Joi from "joi";

const createCountySchema = Joi.object({
    district_id: Joi.number().integer().required(),
    name: Joi.string().required().allow(null).default(null),
});

export { createCountySchema };
