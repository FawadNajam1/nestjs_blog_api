import Joi from "joi";

export default Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    EMAIL_HOST: Joi.required(),
    EMAIL_PORT: Joi.number().default(587),
    EMAIL_USER: Joi.string().required(),
    EMAIL_PASS: Joi.string().required()
})