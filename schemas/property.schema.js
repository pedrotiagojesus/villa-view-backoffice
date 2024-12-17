import Joi from "joi";

const createPropertySchema = Joi.object({
    reference: Joi.string().required().allow(null).default(null),
    district_id: Joi.number().integer().required(),
    county_id: Joi.number().integer().required(),
    parish_id: Joi.number().integer().required(),
    property_goal_id: Joi.number().integer().required(),
    property_status_id: Joi.number().integer().required(),
    property_type_id: Joi.number().integer().required(),
    property_name: Joi.string().max(255).required().allow(null).default(null),
    description: Joi.string().allow(null).default(null),
    construction_year: Joi.number()
        .integer()
        .min(1800)
        .max(new Date().getFullYear())
        .allow(null)
        .default(null),
    contact: Joi.string().allow(null).default(null),
    cover_image: Joi.string().allow(null).default(null),
    email: Joi.string().allow(null).default(null),
    latitude: Joi.number().precision(6).allow(null).default(null),
    longitude: Joi.number().precision(6).allow(null).default(null),
    name: Joi.string().max(255).allow(null).default(null),
    price: Joi.number().min(0).required().default(0),
    room: Joi.number().integer().min(0).default(0),
    is_visible: Joi.boolean().default(true),
    is_highlight: Joi.boolean().default(false),
});

export { createPropertySchema };
