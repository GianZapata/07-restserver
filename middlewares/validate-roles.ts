import { NextFunction, Response } from 'express';
import { UserRequest } from '../interfaces/request';

export const isAdminRole = (req: UserRequest, res: Response, next: NextFunction) => {

	if( !req.headers.user ) {
		return res.status(401).json({
			message: 'No hay usuario en la petición'
		});
	}

	const { role, name } = req.headers.user;
   
	if( role !== 'ADMIN_ROLE' ) {
		return res.status(401).json({
			message: `El usuario ${name} no es administrador`
		});
	}

	next();
};

export const hasRole = (...roles: string[]) => {
	return (req: UserRequest, res: Response, next: NextFunction) => {
		if( !req.headers.user ) {
			return res.status(401).json({
				message: 'No hay usuario en la petición'
			});
		}

		const { role, name } = req.headers.user;
   
		if( !roles.includes(role) ) {
			return res.status(401).json({
				message: `El usuario ${name} no tiene permisos`
			});
		}

		next();
	};
};