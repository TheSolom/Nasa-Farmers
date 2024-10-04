import ErrorHandler from '../utils/error.handler.js';
import HttpStatusCodes from '../utils/httpStatusCodes.js';

const validateRequest = (schemas) => {
    return (req, _res, next) => {
        const validatePart = (schemaKey) => {
            if (schemas[schemaKey]) {
                const { error, value } = schemas[schemaKey].validate(req[schemaKey], { abortEarly: false });
                if (error) {
                    throw new ErrorHandler(
                        'Validation failed',
                        HttpStatusCodes.UNPROCESSABLE_ENTITY,
                        error.details.map((detail) => detail.message)
                    );
                }

                req[schemaKey] = value;
            }
        };

        validatePart('query');
        validatePart('params');
        validatePart('body');

        next();
    };
};

export default validateRequest;
