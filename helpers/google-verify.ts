import { OAuth2Client } from 'google-auth-library';
import { IGoogle } from '../interfaces/users';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleVerify = async (token : string) => {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID
	});
	const { name, picture, email }  = <IGoogle>ticket.getPayload();

	return {
		name,
		email,
		img: picture		
	};
};