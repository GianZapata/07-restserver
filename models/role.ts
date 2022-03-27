import { Schema, model } from 'mongoose';

interface RoleProps { 
   role: string
}
const RoleSchema = new Schema<RoleProps>({
	role: {
		type: String,
		required: [ true, 'El rol es necesario' ],
	}
});

export default model<RoleProps>('Role', RoleSchema);