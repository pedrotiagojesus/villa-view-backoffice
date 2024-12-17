import Joi from "joi";

const createDistrictSchema = Joi.object({
    name: Joi.string().required().allow(null).default(null),
});

export { createDistrictSchema };
