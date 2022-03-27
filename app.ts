import express from 'express'; 
import dotenv from 'dotenv'; 

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
	res.send('Hello World! 1232312313');
});

app.listen(port, () => {
	console.log('Example app listening on port', port);
});