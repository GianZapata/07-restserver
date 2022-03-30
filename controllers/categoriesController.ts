import { Request, Response } from 'express';
import { UserRequest } from '../interfaces';
import { Category, ICategory } from '../models';

export const getCategories = async (req: Request, res: Response) => {
	const { limit = 5 }: { limit?: number, skip?: number } = req.query;
	const query = { status: true };

	const [total, categories ] = await Promise.all([
		Category.countDocuments( query ),
		Category.find( query )
			.limit( Number( limit ) )
			.populate( 'user')
	]);

	res.json({			
		total,
		categories
	});
};

export const getCategoryById = async (req: UserRequest, res: Response) => {
	const category = await Category.findById( req.params.id ).populate( 'user' );

	if( !category ) {
		return res.status(404).json({
			message: 'La categoría no existe'
		});
	}

	res.json({
		category
	});

};

export const createCategory = async (req: UserRequest, res: Response) => {
	const name = <ICategory>req.body.name.toUpperCase();

	try {
		const categoryDB : ICategory | null = await Category.findOne({ name });

		if ( categoryDB ) {
			return res.status(400).json({
				message: `La categoría ${ categoryDB.name } ya existe`
			});
		}
	
		if( !req.headers.user ) throw new Error('No hay usuario');

		const data = {
			name,
			user: req.headers.user._id
		};

		const category = new Category(data);
		await category.save();

		res.status(201).json({
			category
		});

	} catch (error) {
		console.log({error});
		return res.status(500).json({
			ok: false,
			message: 'Hable con el administrador',
			error
		});
	}
};

export const updateCategory = async (req: UserRequest, res: Response) => {
	const { id } = req.params;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { _id, name, user, status, ...rest } = req.body;

	try {
	
		rest.name = name.toUpperCase();		
		rest.user = req.headers.user ? req.headers.user._id : null;

		const categoryUpdated = await Category.findByIdAndUpdate( id, rest );		
		
		res.json({
			category: categoryUpdated
		});

	} catch (error) {
		console.log({error});
		return res.status(500).json({
			ok: false,
			message: 'Hable con el administrador',
			error
		});
	}

};

export const deleteCategory = async (req: UserRequest, res: Response) => {
	const { id } = req.params;

	try {

		const categoryUpdated = await Category.findByIdAndUpdate( id, { status: false }, { new: true } );		
		
		res.status(200).json({
			category: categoryUpdated,
			message: 'Categoría eliminada'
		});

	} catch (error) {
		console.log({error});
		return res.status(500).json({
			ok: false,
			message: 'Hable con el administrador',
			error
		});
	}

};