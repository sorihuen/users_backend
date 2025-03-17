const express = require('express');
const router = express.Router();
const { createUser, validateUser, getUsers, getUserById, updateUser} = require('../controllers/userController');


router.post('/users', validateUser, createUser); // Ruta para crear un usuario (POST)
router.get('/users/:id', getUserById); // Obtener usuario por ID
router.get('/users', getUsers); // listar todos los usuarios
router.put('/users/:id', updateUser); // actualizar un usuario por ID (PUT)
module.exports = router;