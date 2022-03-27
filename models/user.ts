import { Schema, model, Model, Document } from 'mongoose';

export interface IUser extends Document {
   name: string;
   email: string;
   password: string;
   img?: string;
   role: string;
   status?: boolean;
   google?: boolean;
}

const userSchema: Schema = new Schema<IUser, Model<IUser>>({
	name: {
		type: String,
		required: [ true, 'El nombre es necesario' ],
	},
	email: {
		type: String,
		required: [ true, 'El correo es necesario' ],
		unique: true,
	},
	password: {
		type: String,
		required: [ true, 'El contraseña es necesario' ],
	},
	img: {
		type: String,	
	},
	role: {
		type: String,
		required: true,
		enum: ['USER_ROLE', 'ADMIN_ROLE'],
	},
	status: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	}
});

userSchema.methods.toJSON = function() {
	const { __v, password, ...user }: IUser = this.toObject();
	return user;
};

const User: Model<IUser> = model('User', userSchema);

export default User;

