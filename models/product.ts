import { Schema, model, Model, Document } from 'mongoose';
import { IUser, ICategory } from './';

export interface IProduct extends Document {
   name: string;
	status: boolean;
	user: IUser;
	price: number;
	category: ICategory;
	description: string;
	available: boolean;
}

const productSchema: Schema = new Schema<IProduct, Model<IProduct>>({
	name: {
		type: String,
		required: [ true, 'El nombre es necesario' ],
	},
	status: {
		type: Boolean,
		required: true,
		default: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	price: {
		type: Number,
		default: 0
	},
	category: { 
		type: Schema.Types.ObjectId,
		ref: 'Category'		
	},
	description: {
		type: String
	},
	available: {
		type: Boolean,	
		default: true
	}
});


productSchema.methods.toJSON = function() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { __v, status, _id, ...product }: IProduct = this.toObject();
	return {
		...product,
		uid: _id
	};
};

const Product: Model<IProduct> = model('Product', productSchema);

export default Product;

