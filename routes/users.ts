import { Router } from 'express';
import { check } from 'express-validator';

import { isAdminRole, validateFields, validateJWT, hasRole } from '../middlewares';
import { usersGet, usersPost, usersPut, usersDelete } from '../controllers';
import { emailExists, isValidRole, userExistsById } from '../helpers/db-validators';

const router = Router();

router.get('/', usersGet );

router.put('/:id', [
	check('id', 'No es un id valido').isMongoId(),
	check('id').custom( userExistsById ),
	check('role').custom( isValidRole ),
	validateFields
], usersPut );

router.post('/', [
	check('name', 'El nombre es obligatorio').notEmpty(),
	check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
	check('email', 'El correo no es valido').isEmail(),
	check('email').custom( emailExists ),	
	// check('role', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
	check('role').custom( isValidRole ),
	validateFields
], usersPost );

router.delete('/:id', [	
	validateJWT,
	isAdminRole,
	hasRole('ADMIN_ROLE'),
	check('id', 'No es un id valido').isMongoId(),
	check('id').custom( userExistsById ),
	validateFields
], usersDelete );


export default router;