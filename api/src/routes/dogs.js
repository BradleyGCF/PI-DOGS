const { Router } = require('express');
const { getAllDogs, createDog } = require('../utils/index.js');
const { Dog, Temperamets } = require('../db');
const  axios  = require("axios");

const router = Router();


/* GET /dogs: 
    obtiene listado de las razas de perro. 
    devuelve sólo los datos necesarios para la ruta principal. */

/* GET /dogs?name="...":
    obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
    si no existe ninguna raza de perro mostrar un mensaje adecuado */

    //----------------------------------------------------------------

router.get('/', async (req, res) => {
  try {
    const { name } = req.query;

    const info = await getAllDogs(); // traemos los dogs

    if (!name) {
      res.status(200).send(info); // preguntamos si nos pasan name, en caso de que no, mandamos todo
    }
    else {
      const filtrado = info.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase())); // viene por defecto en mayuscula, directamente pasamos todo a minuscula.

      filtrado.length ? 
      res.status(200).send(filtrado) :
       res.status(400).send('Dog not found, sorry'); 
    }


  } catch (error) {
    res.send('Dog not found', error); // En caso de que rompa la ruta
  }
});

//-------------------------------IDraza---------------------------------
/* obtener el detalle de una raza de perro en particular
    debe traer solo los datos pedidos en la ruta de detalle de raza de perro 
    incluir los temperamentos asociados */

router.get('/:idRaza', async (req, res) => {
  try {
      const id = req.params.idRaza;
      const allDogs = await getAllDogs();

      if (id) {
          let idDog = await allDogs.filter(dog => dog.id == id);
          idDog.length ? 
           res.status(200).send(idDog) :
           res.status(404).json("Breed not found :(");
      }
  } catch (error) {
      res.status(400).json("ERROR: Unexpected error in search for ID.");
  }
});

  //----------------------------POST------------------------------------
   /*recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body 
    crea una raza de perro en la base de datos relacionada con sus temperamentos */


    router.post("/", async (req, res) => {
      try {
          const dogData = { name, minHeight, maxHeight, minWeight, maxWeight, image, temperament, life_span, createdInDb } = req.body;
  
          const created = await createDog(dogData)
          
          return res.status(201).send(created)
  
      } catch (error) {
          console.log(error)
      }
  })

//-------------------------------DELETE------------------------------

     router.delete('/',async (req,res)=>{
        let {name} = req.query
        try {
         await Dog.destroy({
            where: {
              name: name,
            }
          })
          res.status(200).json('dog deleted');  
        } catch (error) {
          console.log(error)
        }})
    

  
  

  
  module.exports = router;