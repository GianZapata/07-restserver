import { Router } from 'express';
import { check } from 'express-validator';

import { usersGet, usersPost, usersPut, usersDelete } from '../controllers';
import { validateFields } from '../middlewares';
import { Role } from '../models';

const router = Router();

router.get('/', usersGet );

router.put('/:id', usersPut );

router.post('/', [
	check('name', 'El nombre es obligatorio').notEmpty(),
	check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
	check('email', 'El correo no es valido').isEmail(),
	// check('role', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
	check('role').custom( async ( role = '') => {
		const roleExists = await Role.findOne({ role });
		if (!roleExists) {
			throw new Error(`El rol ${role} no esta registrado`);
		}
	}),
	validateFields
], usersPost );

router.delete('/', usersDelete );


export default router;