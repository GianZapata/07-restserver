import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import { User, UserProps } from '../models';

export const usersGet = (req: Request ,res: Response) => {  
	
	const params = req.query;

	res.json({
		message: 'get API - Controller',				
		params
	});
};

export const usersPost = async (req: Request ,res: Response) => {   	

	const { name, email, password, role } : UserProps = req.body;

	try { 
		const user = new User<UserProps>({ name, email: email , password, role });
		
		// Verificar si el correo ya existe en la base de datos
		const emailExists = await User.findOne({ email });
		if (emailExists) { // Si el correo ya existe
			return res.status(400).json({ // 400 Bad Request
				message: 'El correo ya existe'
			});
		}

		//Encriptar la contraseña
		const salt = bcryptjs.genSaltSync(10); // 10 es la cantidad de veces que se va a encriptar
		user.password = bcryptjs.hashSync(password, salt); // HashSync es una funcion que se encarga de encriptar la contraseña

		// Guardar el usuario en la base de datos
		await user.save();
	
		res.json({
			message: 'post API - Controller',
			user
		});
	} catch (error) {
		return res.status(400).json({
			message: 'Error al crear usuario',
			error
		});
	}
	
};

export const usersPut = (req: Request ,res: Response) => { 	

	const { id } = req.params;
	
	res.json({
		message: 'put API - Controller',
		id	
	});
};

export const usersDelete = (req: Request ,res: Response) => {   
	res.json({
		message: 'delete API - Controller'				
	});
};
