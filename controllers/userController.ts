import { Request, Response } from 'express';

export const usersGet = (req: Request ,res: Response) => {  
	
	const params = req.query;

	res.json({
		message: 'get API - Controller',				
		params
	});
};

export const usersPost = (req: Request ,res: Response) => {   

	const body = req.body;
	
	res.json({
		message: 'post API - Controller',
		body	
	});
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
