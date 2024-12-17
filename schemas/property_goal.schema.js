import Joi from "joi";

const createPropertyGoalSchema = Joi.object({
    name: Joi.string().required().allow(null).default(null),
});

export { createPropertyGoalSchema };
