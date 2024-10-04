import Joi from 'joi';

export const addLocationParamsValidation = Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
});
