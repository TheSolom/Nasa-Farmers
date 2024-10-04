import { Router } from 'express';

import {
    registerValidation,
    loginValidation,
} from '../domain/auth.validation.js';
import {
    register,
    login,
} from '../api/auth.controller.js';
import validateRequest from '../../../shared/middleware/validation.js';

const router = Router();

router.post('/register', validateRequest({ body: registerValidation }), register);

router.post('/login', validateRequest({ body: loginValidation }), login);

export default router;
