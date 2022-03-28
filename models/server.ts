import express, { Application } from 'express';  
import cors from 'cors';

import { auth, user } from '../routes';
import { dbConnection } from '../database/config';

class Server { 	

	private app : Application;
	private port: string;
	private usersPath: string;
	private authPath: string;

	constructor(){      
		this.app = express();
		this.port = this.port =  process.env.PORT || '8000';
		this.usersPath = '/api/users';
		this.authPath = '/api/auth';

		// Conectar a la base de datos
		this.connectDB();
		
		// Middlewares
		this.middlewares();

		// Rutas de mi aplicación
		this.routes();
	}

	async connectDB(){
		await dbConnection();		
	}

	middlewares() {

		// CORS 
		this.app.use( cors() );

		// Body Parser 
		this.app.use( express.json() );

		// Directorio publico
		this.app.use( express.static('public') );
	}

	routes() { 
		this.app.use(this.usersPath, user );
		this.app.use(this.authPath, auth );
	}

	listen() {       
		this.app.listen(this.port, () => {
			console.log('Example app listening on port', this.port);
		});
	}

}

export default Server;