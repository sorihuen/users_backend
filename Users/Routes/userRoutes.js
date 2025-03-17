const express = require('express');
const router = express.Router();
const { 
    createUser, 
    validateUser, 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser, 
    searchUsersByCity 
} = require('../controllers/userController'); 

// Ruta para crear un nuevo usuario. Se ejecuta `validateUser` antes de `createUser`
router.post('/users', validateUser, createUser); 

// Ruta para buscar usuarios por ciudad. Se accede con `/users/search?ciudad=nombre_ciudad`
router.get('/users/search', searchUsersByCity); 

// Ruta para obtener la lista de todos los usuarios
router.get('/users', getUsers); 

// Ruta para obtener un usuario específico por su ID
router.get('/users/:id', getUserById); 

// Ruta para actualizar un usuario por su ID
router.put('/users/:id', updateUser); 

// Ruta para eliminar un usuario por su ID
router.delete('/users/:id', deleteUser); 

module.exports = router;
