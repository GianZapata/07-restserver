import { Request, Response } from 'express';

import { User, IUser } from '../models';
import { hashPassword } from '../helpers/db-validators';

export const usersGet = async (req: Request ,res: Response) => {  
	
	const { limit = 5, skip = 5 }: { limit?: number, skip?: number } = req.query;
	const query = { status: true };

	const [total, users ] = await Promise.all([
		User.countDocuments( query ),
		User.find<IUser[]>( query )
			.skip(Number(skip))
			.limit(Number(limit))
	]);

	res.json({			
		total,
		users
	});
};

export const usersPost = async (req: Request ,res: Response) => {   	

	const { name, email, password, role } : IUser = req.body;

	try { 
		const user: IUser = new User({ name, email: email , password, role });
			
		//Encriptar la contraseña HashSync es una funcion que se encarga de encriptar la contraseña
		user.password = hashPassword( password );

		// Guardar el usuario en la base de datos
		await user.save();
	
		res.json({
			user
		});
	} catch (error) {
		return res.status(400).json({
			message: 'Error al crear usuario',
			error
		});
	}
	
};

export const usersPut = async (req: Request ,res: Response) => { 	

	const { id } = req.params;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { _id, password, google, email, ...rest } = req.body;
		
	try {
		// TODO validar contra la base de datos
		if( password ) {
			rest.password = hashPassword( password );
		}
		
		const user: IUser | null = await User.findByIdAndUpdate(id, rest );

		res.json(user);
	} catch (error) {
		return res.status(400).json({
			message: 'Error al actualizar usuario',
			error
		});
	}
};

export const usersDelete = async (req: Request ,res: Response) => {   
	const { id } = req.params;

	try {
		// Borrar físicamente
		// const user = await User.findByIdAndDelete(id);
		
		const user: IUser | null = await User.findByIdAndUpdate(id, { status: false });
		const userAuthenticated = req.headers.user;

		res.json({
			user,
			userAuthenticated							
		});
		
	} catch (error) {
		return res.status(400).json({
			message: 'Error al borrar usuario',
			error
		});
	}

};
