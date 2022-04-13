import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  APP_PORT: Joi.number().required(),
  MONGODB_URL: Joi.string().required(),
});
