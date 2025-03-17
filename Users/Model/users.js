const mongoose = require('mongoose'); 

// Schema for addresses (Esquema para las direcciones)
const addressSchema = new mongoose.Schema({
  street: String, // Calle
  city: String,   // Ciudad
  country: String, // País
  postal_code: String // Código postal
});

// User schema (Esquema de Usuario)
const userSchema = new mongoose.Schema({
  name: {
    type: String, // Tipo de dato: cadena de texto
    required: true // Campo requerido
  },
  email: {
    type: String, // Tipo de dato: cadena de texto
    required: true, // Campo requerido
    unique: true // Debe ser único en la base de datos
  },
  age: {
    type: Number, // Tipo de dato: número
    required: false // Campo opcional
  },
  created_at: {
    type: Date, // Tipo de dato: fecha
    default: Date.now // Valor por defecto: la fecha actual
  },
  addresses: [addressSchema] // Relación con el esquema de direcciones 
});

module.exports = mongoose.model('User', userSchema);

