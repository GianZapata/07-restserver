import { Category, IUser, Product, Role, User } from '../models';
import bcryptjs from 'bcryptjs';

export const isValidRole = async ( role = '') => {
	// Validar que el rol sea valido
	const roleExists = await Role.findOne({ role });
	if (!roleExists) {
		throw new Error(`El rol ${ role } no esta registrado`);
	}
};

export const emailExists = async ( email = '' ) => {
	// Verificar si el correo ya existe en la base de datos
	const emailExists: IUser | null = await User.findOne({ email });
	
	// Si el correo ya existe
	if (emailExists) { 
		throw new Error(`El correo: ${ email }, ya esta registrado`);
	}
};

export const userExistsById = async ( id: string ) => {
	// Verificar si el id ya existe en la base de datos
	const userExists: IUser | null = await User.findById( id );
	
	// Si el id ya existe
	if ( !userExists ) { 
		throw new Error(`El id: ${ id }, no esta registrado`);
	}
};

export const hashPassword = ( password: string ) : string => {

	const salt = bcryptjs.genSaltSync(10); // 10 es la cantidad de veces que se va a encriptar
	return bcryptjs.hashSync(password, salt); //
};

export const categoryExists = async (id: string) => {		
	const category = await Category.findById(id);	

	if ( !category ) {
		throw new Error('La categoría no existe');
	}

	if ( !category.status ) {
		throw new Error('La categoría no está activa');
	}

};

export const productExists = async (id: string) => {
	const product = await Product.findById(id);

	if ( !product ) {
		throw new Error('El producto no existe');
	}

	if ( !product.status ) {
		throw new Error('El producto no está activo');
	}

};