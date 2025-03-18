const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Conexión a MongoDB 
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1); // Terminar el proceso 
  }
};

// Manejo de eventos de conexión
mongoose.connection.on('connected', () => {
  console.log('Conexión establecida con MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error en la conexión de MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Desconectado de MongoDB');
});

// Desconexión segura al cerrar el servidor
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada debido a la terminación del servidor');
    process.exit(0);
  } catch (err) {
    console.error('Error al cerrar la conexión de MongoDB:', err);
    process.exit(1);
  }
});

module.exports = connectDB;