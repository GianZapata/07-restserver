import { connect } from 'mongoose';
import { ConnectionOptions } from 'tls';
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const dbConnection = async () => {
	const uri = process.env.MONGODB_CNN || 'mongodb+srv://Gian79:qGtMpZz2sXeKIulc@cluster0.msmyt.mongodb.net/cafeDB';
	try {
		await connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,		
		} as ConnectionOptions);
		console.log('MongoDB connected');
	} catch (error) {
		console.log({ error });
		throw new Error('Error a la hora iniciar la base de datos');
	}
};