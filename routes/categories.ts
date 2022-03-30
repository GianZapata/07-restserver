import { categoryExists } from './../helpers/db-validators';
import { Router } from 'express';
import { check } from 'express-validator';

import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers';
import { hasRole, isAdminRole, validateFields, validateJWT } from '../middlewares';

const router = Router();

/**
 * 
 *  {{ url }}/api/categories
*/

// Obtener todas las categorías
router.get('/', getCategories );

// Obtener categoría por id
router.get('/:id', [
	check('id').not().isEmpty(),
	check('id').isMongoId(),
	check('id').custom( categoryExists ),
	validateFields
], getCategoryById );

// Crear categoría - cualquier persona con un token valido puede crear una categoría
router.post('/', [ 
	check('name', 'El nombre de la categoría es obligatorio').not().isEmpty(),
	validateJWT, 
	validateFields 
], createCategory );

//  Actualizar categoría - cualquier persona con un token valido puede actualizar una categoría
router.put('/:id', [
	validateJWT,
	check('id').not().isEmpty(),
	check('id').isMongoId(),
	check('id').custom( categoryExists ),
	validateFields
], updateCategory );

// Eliminar categoría - Administradores pueden eliminar una categoría
router.delete('/:id', [
	validateJWT,
	isAdminRole,
	hasRole('ADMIN_ROLE'),
	check('id').custom( categoryExists ),
	validateFields
], deleteCategory);

export default router;