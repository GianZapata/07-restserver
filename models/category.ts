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

categorySchema.methods.toJSON = function() {	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { __v,  _id, status, ...rest }: ICategory = this.toObject();

	return {
		...rest,
		uid: _id
	};
};


const Category: Model<ICategory> = model('Category', categorySchema);

export default Category;

