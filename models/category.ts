import { Schema, model, Model, Document } from 'mongoose';
import { IUser } from './user';

export interface ICategory extends Document {
   name: string;
   status: boolean;
   user: IUser
}

const categorySchema: Schema = new Schema<ICategory, Model<ICategory>>({
	name: {
		type: String,
		required: [ true, 'El nombre es necesario' ],
		unique: true
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
	}
});


const Category: Model<ICategory> = model('Category', categorySchema);

export default Category;

