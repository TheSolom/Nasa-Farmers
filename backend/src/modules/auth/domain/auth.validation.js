import Joi from 'joi';

const PASSWORD_MIN_LENGTH = 4;
const PASSWORD_MAX_LENGTH = 64;

export const registerValidation = Joi.object({
    fullName: Joi.string()
        .required()
        .trim()
        .regex(/^[A-Z a-z]+$/)
        .messages({
            'any.required': 'Full name is required',
            'string.base': 'Full name must be a string',
            'string.empty': 'Full name is required',
            'string.pattern.base': 'Full name must only contain letters',
        }),
    email: Joi.string()
        .required()
        .email()
        .normalize()
        .messages({
            'any.required': 'Email is required',
            'string.email': 'Email must be a valid email',
        }),
    job: Joi.string()
        .required()
        .trim()
        .messages({
            'any.required': 'Job is required',
            'string.base': 'Job must be a string',
            'string.empty': 'You must type a job',
        }),
    password: Joi.string()
        .required()
        .trim()
        .min(PASSWORD_MIN_LENGTH)
        .max(PASSWORD_MAX_LENGTH)
        .messages({
            'any.required': 'Password is required',
            'string.base': 'Password must be a string',
            'string.empty': 'You must type a password',
            'string.min': `Password must be ${PASSWORD_MIN_LENGTH} to ${PASSWORD_MAX_LENGTH} characters long`,
            'string.max': `Password must be ${PASSWORD_MIN_LENGTH} to ${PASSWORD_MAX_LENGTH} characters long`,
        }),
    confirmPassword: Joi.any()
        .required()
        .valid(Joi.ref('password'))
        .messages({
            'any.required': 'Confirm password is required',
            'any.only': 'Password does not match with the confirm password'
        })
});

export const loginValidation = Joi.object({
    email: Joi.string()
        .required()
        .email()
        .normalize()
        .messages({
            'any.required': 'Email is required',
            'string.email': 'Email must be a valid email',
        }),
    password: Joi.string()
        .required()
        .trim()
        .messages({
            'any.required': 'Password is required',
            'string.base': 'Password must be a string',
            'string.empty': 'You must type a password',
        }),
});
