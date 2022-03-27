import { Request, Response } from 'express';


export const usersGet = (req: Request ,res: Response) => {   
	res.json({
		message: 'get API - Controller'				
	});
};

export const usersPost = (req: Request ,res: Response) => {   
	res.json({
		message: 'post API - Controller'				
	});
};

export const usersPut = (req: Request ,res: Response) => {   
	res.json({
		message: 'put API - Controller'				
	});
};
export const usersDelete = (req: Request ,res: Response) => {   
	res.json({
		message: 'delete API - Controller'				
	});
};
