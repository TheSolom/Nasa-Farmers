import Joi from 'joi';
import { Types } from 'mongoose';

export const getUserParamsValidation = Joi.object({
    userId: Joi.custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    })
});

export const getUserLocationsParamsValidation = Joi.object({
    userId: Joi.custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    })
});
