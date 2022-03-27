import { Schema, model } from 'mongoose';

export interface UserProps {
   name: string;
   email: string;
   password: string;
   img?: string;
   role: string;
   status?: boolean;
   google?: boolean;
}

const userSchema = new Schema<UserProps>({
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


export default model<UserProps>('User', userSchema);

