import jwt from 'jsonwebtoken';

export const parseJwt = (token: string) : string => {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace('-', '+').replace('_', '/');
	return JSON.parse(window.atob(base64));
};

export const generateJWT = (uid: string) : Promise<string> => {
	return new Promise((resolve, reject) => {
		const payload = { uid };	
		jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY || 'SECRET', {
			expiresIn: '4h'
		}, (err, token) => {
			if(err) {
				console.log({name: 'generarJWT', err});					
				reject('Error al generar el token');
			} else {
				resolve(token as string);
			}
		});
	});
};