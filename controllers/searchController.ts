import { Response } from 'express';
import { Types } from 'mongoose';
import { SearchRequest } from '../interfaces';
import { Category, Product, User } from '../models';
const collections = ['users', 'categories', 'products', 'roles'];

const searchUsers = async( term  = '' , res: Response ) => {

	const isMongoId = Types.ObjectId.isValid( term );

	if( isMongoId ) {
		const users = await User.findById( term );      
		return res.json({
			results: (users) ? [users] : []
		});
	}

	const users = await User.find({
		$or: [
			{ name: { $regex: term, $options: 'i' } },
			{ email: { $regex: term, $options: 'i' } }
		],
		$and: [{ status: true }]
	});

	return res.json({
		results: users
	});
};

const searchCategories = async (term: string, res: Response) => {
	
	const isMongoId = Types.ObjectId.isValid( term );

	if( isMongoId ) {
		const categories = await Category.findById( term );      
		return res.json({
			results: (categories) ? [categories] : []
		});
	}
   
	const categories = await Category.find({
		name: { $regex: term, $options: 'i' },
		status: true
	});

	return res.json({
		results: categories
	});
};

const searchProducts = async (term: string, res: Response) => {

	const isMongoId = Types.ObjectId.isValid( term );

	if( isMongoId ) {
		const products = await Product.findById( term ).populate('category','name');      
		return res.json({
			results: (products) ? [products] : []
		});
	}

	const products = await Product.find({
		name: { $regex: term, $options: 'i' },
		status: true
	}).populate('category','name');

	return res.json({
		results: products
	});
};

export const search = async (req: SearchRequest, res: Response) => {

	const { collection, term } = req.params; 

	if ( !collections.includes(collection) ) {
		return res.status(400).json({
			error: 'Invalid collection'
		});
	}

	switch (collection) {
	case 'users':
		searchUsers( term, res );
		break;
	case 'categories':
		searchCategories( term, res );
		break;
	case 'products':
		searchProducts( term, res );
		break;
      
	default:
		res.status(500).json({
			error: 'Unknown collection'
		});
		break;
	}
};
