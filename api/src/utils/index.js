const axios = require('axios');
const { Dog, Temperaments } = require('../db.js');




//----------------------------Traemos la informacion de la API------------------------------------
const getApiInfo = async () => {
    try {
    const api = await axios.get('https://api.thedogapi.com/v1/breeds');
        const apiInfo = await api.data.map((el) => {
            return {
                id: el.id,
                name: el.name,
                image: el.image.url,
                life_span: el.life_span,
                weight: el.weight.metric,
                height: el.height.metric,
                temperament: el.temperament
            };
        });
        return apiInfo;
    } catch (error) {
        console.log('Error en getApiInfo', error);
    }
};

//-------------------Traemos la informacion de la base de datos------------------------------

const getDbInfo = async () => {
    try {
        return await Dog.findAll({ 
            include: {
                model: Temperaments,  
                attributes: ["name"], 
                through: {
                    attributes: [],
                },
            },
        });
    } catch (error) {
        console.log('error en getDbInfo', error);
    }
};

//-------------------------------Toda la data de la API y de la DB---------------------------------

const getAllDogs = async () => {
    try {
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const allInfo = [...apiInfo, ...dbInfo];
        return allInfo;

    } catch (error) {
        console.log('Error en getAllDogs', error);
    }
}

// //----------------------------------------------------------------

const getTemperamentInfo = async () => {
    try {
        const api = await axios.get('https://api.thedogapi.com/v1/breeds');

        let temperaments = await api.data.map((temp) => {
            if (temp.temperament) return temp.temperament;
        })
            .join()
            .split(",");

        let temps = [];

        temperaments.map((el) => {
            if (!temps.includes(el.trim()) && el) {
                temps.push(el.trim());
            }
        })

        temps.map(async (el) => {
            await Temperaments.findOrCreate({
                where: { name: el },
            });
        });
    } catch (error) {
        console.log("No se encontraron resultados", error);
    }
};
    //------------------------------------CREATED------------------------------------------
       const createDog = async (dogData) => {

        const {name, minHeight, maxHeight, minWeight, maxWeight, image, temperament, life_span, createdInDb} = dogData
    
        const newDog = await Dog.create({
            name,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            image,
            temperament,
            life_span,
            createdInDb,
        })
        const addTypesInDb = await Temperaments.findAll({
            where: {name: types}
        })
    
        newDog.addTemperaments(addTypesInDb)
    
        return newDog
    }



module.exports = { getApiInfo, getDbInfo, getAllDogs, getTemperamentInfo, createDog };