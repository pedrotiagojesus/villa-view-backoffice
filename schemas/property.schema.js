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
    email: Joi.string().allow(null).default(null),
    latitude: Joi.number().precision(6).allow(null).default(null),
    longitude: Joi.number().precision(6).allow(null).default(null),
    name: Joi.string().max(255).allow(null).default(null),
    price: Joi.number().min(0).required().default(0),
    room: Joi.number().integer().min(0).default(0),
    is_visible: Joi.boolean().default(true),
    is_highlight: Joi.boolean().default(false),
});

const updatePropertySchema = Joi.object({
    reference: Joi.string().optional(),
    district_id: Joi.number().optional(),
    county_id: Joi.number().optional(),
    parish_id: Joi.number().optional(),
    property_goal_id: Joi.number().optional(),
    property_status_id: Joi.number().optional(),
    property_type_id: Joi.number().optional(),
    property_name: Joi.string().optional(),
    description: Joi.string().allow(null).optional(),
    construction_year: Joi.number().allow(null).optional(),
    contact: Joi.string().allow(null).optional(),
    email: Joi.string().email().allow(null).optional(),
    latitude: Joi.number().allow(null).optional(),
    longitude: Joi.number().allow(null).optional(),
    name: Joi.string().allow(null).optional(),
    price: Joi.number().optional(),
    room: Joi.number().optional(),
    is_visible: Joi.boolean().optional(),
    is_highlight: Joi.boolean().optional(),
});

const propertyCoverImageSchema = Joi.object({
    cover_image: Joi.string().optional().allow(null),
});

export { createPropertySchema, updatePropertySchema, propertyCoverImageSchema };
