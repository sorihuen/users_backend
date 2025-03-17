const mongoose = require('mongoose');

// Esquema para las direcciones
const direccionSchema = new mongoose.Schema({
  calle: String,
  ciudad: String,
  pais: String,
  codigo_postal: String
});

// Esquema de Usuario
const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  edad: {
    type: Number,
    required: false
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
  direcciones: [direccionSchema]
});

module.exports = mongoose.model('Usuario', usuarioSchema);

