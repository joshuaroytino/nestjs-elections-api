import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  APP_PORT: Joi.number().required(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().required(),
  MONGODB_URL: Joi.string().required(),
});
