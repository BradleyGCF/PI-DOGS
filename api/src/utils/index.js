const axios = require('axios');
const { Dog, Temperament } = require('../db.js');



// const {API_KEY} = process.env /// api_key=${API_KEY}
//----------------------------Traemos la informacion de la API------------------------------------
const getApiInfo = async () => {
    try {
    const api = await axios.get('https://api.thedogapi.com/v1/breeds?');
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
                model: Temperament,  
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

//-------------------------------Traemos todos los Dogs---------------------------------

const getAllDogs = async () => {
    try {
        const apiInfo = await getApiInfo();
        const dbInfo = await getDbInfo();
        const allInfo = apiInfo.concat(dbInfo);
        return allInfo;

    } catch (error) {
        console.log('Error en getAllDogs', error);
    }
}

//----------------------------------------------------------------

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
            await Temperament.findOrCreate({
                where: { name: el },
            });
        });
    } catch (error) {
        console.log("No se encontraron resultados", error);
    }

};

module.exports = { getApiInfo, getDbInfo, getAllDogs, getTemperamentInfo };