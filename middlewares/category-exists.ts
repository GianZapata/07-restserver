import { Category } from '../models';

export const categoryExists = async (id: string) => {		
	const category = await Category.findById(id);	

	if ( !category ) {
		throw new Error('La categoría no existe');
	}

	if ( !category.status ) {
		throw new Error('La categoría no está activa');
	}

};