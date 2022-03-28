import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields} from '../middlewares/validate-fields';
import { login, googleSignIn  } from '../controllers';

const router = Router();

router.post('/login',[   
	check('email', 'El correo es obligatorio').not().isEmpty().isEmail(),
	check('password', 'La contraseña es obligatoria').not().isEmpty(),
	validateFields
], login );

router.post('/google',[   
	// check('id_token', 'El id_token es obligatorio').not().isEmpty(),	
	// validateFields
], googleSignIn );

export default router;