const express = require('express');
const router = express.Router();

// Importamos las rutas específicas
const userRoutes = require('./userRoutes');

// Usamos las rutas específicas
router.use(userRoutes);



module.exports = router;