const { Router } = require('express');
const { getAllDogs } = require('../utils/index.js');
const { Dog, Temperaments } = require('../db');

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
  let { 
    name, 
    weight, 
    height, 
    life_span, 
    temperament, 
    image } = req.body;

  const capitalizar = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  if (!name || !height || !weight)
    return res.status(400).json({ msg: "faltan datos" });

    try {
   
      let image1 = await (
        await axios.get("https://dog.ceo/api/breeds/image/random")
      ).data.message;
     
      const dogCREATED = await Dog.findOrCreate({
        //devuelvo un array (OJOOO!!!!)
  
        where: {
          name: capitalizar(name),
          weight,
          height,
          life_span,
          image: image? image : image1,
        },
      });
  

    await dogCREATED[0].setTemperaments(temperament); 

    res.status(200).json(dogCREATED);
  } catch (err) {
    throw new Error(err);
  }
});

//-------------------------------DELETE------------------------------
/* recibe un id y borra de la db al perro que la contenga. está auto-controlado, dado que
    las únicas razas que tienen ese botón en su detalle, serán las creadas en la DB */

  //   router.delete('/:id', async (req, res) => {
  //     const id = req.params.id;
  
  //     try {
  //       if (id) {
  //         const deleteDog = await Dog.findByPk(id);
  
  //         if (deleteDog) {
  //             await deleteDog.destroy()
  //             res.status(200).send('Dog was deleted successfully.')
  //         } else res.status(404).status("ERROR: No matches for that ID.");
  
  //       } else res.status(400).send('ERROR: ID does not exist.');
  
  //     } catch (err) {
  //         res.status(400).send('ERROR: Unexpected error.')
  //     }
  // });
  
  

  
  module.exports = router;