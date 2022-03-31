import { Request, Response } from 'express';
import { UserRequest } from '../interfaces';
import { Product, IProduct } from '../models';

export const getProducts = async (req: Request, res: Response) => {
	const { limit = 5 }: { limit?: number, skip?: number } = req.query;
	const query = { status: true };

	const [total, products ] = await Promise.all([
		Product.countDocuments( query ),
		Product.find( query )
			.limit( Number( limit ) )
			.populate('user')
			.populate('category')
	]);

	res.json({			
		total,
		products
	});
};

export const getProductById = async (req: UserRequest, res: Response) => {
	const product = await Product.findById( req.params.id )
		.populate( 'category' )
		.populate( 'user' );

	res.json({
		product
	});

};

export const createProduct = async (req: UserRequest, res: Response) => {

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { status, user, ...body } = <IProduct>req.body;

	try {

		const productDB : IProduct | null = await Product.findOne({ name: body.name });

		if ( productDB ) {
			return res.status(400).json({
				message: `La categoría ${ productDB.name } ya existe`
			});
		}
	
		if( !req.headers.user ) throw new Error('No puedes crear un producto');

		const data = {
			...body,
			name: body.name.toUpperCase(),
			user: req.headers.user._id         
		};

		const product = new Product(data);
		await product.save();

		res.status(201).json({
			product
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

export const updateProduct = async (req: UserRequest, res: Response) => {
	const { id } = req.params;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { user, status, ...rest } = req.body;

	try {
	
		if( rest.name ){			
			rest.name = rest.name.toUpperCase();	
		}
      
		if( req.headers.user )	 { 
			rest.user = req.headers.user._id;
		}		

		const productUpdated = await Product.findByIdAndUpdate( id, rest, { new: true } );		
		
		res.json({
			product: productUpdated
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

export const deleteProduct = async (req: UserRequest, res: Response) => {
	const { id } = req.params;

	try {

		const productUpdated = await Product.findByIdAndUpdate( id, { status: false }, { new: true } );		
		
		res.status(200).json({
			product: productUpdated,
			message: 'Producto eliminada'
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