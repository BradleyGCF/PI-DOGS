const { Router } = require('express');
const { Temperaments } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    try {
        
        const allTemperaments = await Temperaments.findAll();
        console.log(allTemperaments);
        const filterTemperaments = await allTemperaments.map((temp) => temp.name);
        res.status(200).send(filterTemperaments);
        
    } catch (error) {
        console.log("Error en Ruta get de temperaments", error);
    }
});


module.exports = router;