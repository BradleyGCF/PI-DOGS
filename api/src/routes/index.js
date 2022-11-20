const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogs = require('./dogs.js');
const temperaments = require('./temperament.js');

const router = Router();

// Configurar los routers
router.use('/dogs', dogs);
router.use('/temperaments', temperaments);


module.exports = router;
