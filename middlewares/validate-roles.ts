import { NextFunction, Request, Response } from 'express';
export const isAdminRole = (req: Request, res: Response, next: NextFunction) => {

	if( !req.headers.user ) {
		return res.status(401).json({
			message: 'No hay usuario en la petición'
		});
	}

	const { role, name } : any = req.headers.user;
   
	if( role !== 'ADMIN_ROLE' ) {
		return res.status(401).json({
			message: `El usuario ${name} no es administrador`
		});
	}

	next();
};