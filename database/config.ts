import { connect } from 'mongoose';
import { ConnectionOptions } from 'tls';

export const dbConnection = async () => {

	if(process.env.MONGODB_CNN) { 
		try {
			await connect(process.env.MONGODB_CNN, {
				useNewUrlParser: true,
				useUnifiedTopology: true,		
			} as ConnectionOptions);
			console.log('MongoDB connected');
		} catch (error) {
			console.log({ error });
			throw new Error('Error a la hora iniciar la base de datos');
		}
	} else {
		console.log('No se ha definido la variable MONGODB_CNN');		
	}
	
};