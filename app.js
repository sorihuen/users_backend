const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

// Create a new express application instance
const app = express();
const port = process.env.PORT || 3000;

// Body parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Cors
app.use(cors());


// middleware
app.use(express.json());
app.use('/api', require('./Users/Routes/index'));


const options = {
	serverSelectionTimeoutMS: 5000, // Ajusta el tiempo de espera a 5 segundos
	socketTimeoutMS: 45000,        // Ajusta el tiempo de espera del socket a 45 segundos
};

mongoose.connect(process.env.MONGODB_URI, options)
	.then(() => console.log('Connected DB'))
	.catch(err => console.error(err));

mongoose.connection.on('error', err => {
	console.error('Error en la conexión de MongoDB:', err);
});

mongoose.connection.on('connected', () => {
	console.log('Conectado a MongoDB');
});

mongoose.connection.on('disconnected', () => {
	console.log('Desconectado de MongoDB');
});

app.listen(port, () => console.log('Corriendo en ', port));

// Manejo de cierre de la aplicación
process.on('SIGINT', async () => {
	console.log('Closing connections...');
	await mongoose.connection.close();
	process.exit(0);
});



