import express, { Application } from 'express';  
import cors from 'cors';
import { user } from '../routes';

class Server { 	

	private app : Application;
	private port: string;

	constructor(){      
		this.app = express();
		this.port = this.port =  process.env.PORT || '8080';

		// Middlewares
		this.middlewares();

		// Rutas de mi aplicación
		this.routes();
	}

	middlewares() {

		// CORS 
		this.app.use( cors() );

		// Directorio publico
		this.app.use( express.static('public') );
	}

	routes() { 
		this.app.use('/api/users', user );
	}

	listen() {       
		this.app.listen(this.port, () => {
			console.log('Example app listening on port', this.port);
		});
	}

}

export default Server;