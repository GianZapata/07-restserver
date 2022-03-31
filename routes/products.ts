import { productExists } from './../helpers/db-validators';
import { Router } from 'express';
import { check } from 'express-validator';

import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers';
import { hasRole, isAdminRole, validateFields, validateJWT } from '../middlewares';

const router = Router();

/**
 * 
 *  {{ url }}/api/Products
*/

// Obtener todas las categorías
router.get('/', getProducts );

// Obtener producto por id
router.get('/:id', [
	check('id').not().isEmpty(),
	check('id').isMongoId(),
	check('id').custom( productExists ),
	validateFields
], getProductById );

// Crear producto - cualquier persona con un token valido puede crear una producto
router.post('/', [ 
	check('name', 'El nombre de la producto es obligatorio').not().isEmpty(),
	validateJWT, 
	validateFields 
], createProduct );

//  Actualizar producto - cualquier persona con un token valido puede actualizar una producto
router.put('/:id', [
	validateJWT,
	check('id').not().isEmpty(),
	check('id').isMongoId(),
	check('id').custom( productExists ),
	// check(' category', 'La categoría es obligatoria').isMongoId(),
	validateFields
], updateProduct );

// Eliminar producto - Administradores pueden eliminar una producto
router.delete('/:id', [
	validateJWT,
	isAdminRole,
	hasRole('ADMIN_ROLE'),
	check('id').custom( productExists ),
	validateFields
], deleteProduct);

export default router;