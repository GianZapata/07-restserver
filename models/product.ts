import { Schema, model, Model, Document } from 'mongoose';

export interface IProduct extends Document {
   name: string;
}

const productSchema: Schema = new Schema<IProduct, Model<IProduct>>({
	name: {
		type: String,
		required: [ true, 'El nombre es necesario' ],
	},
});


const Product: Model<IProduct> = model('Product', productSchema);

export default Product;

