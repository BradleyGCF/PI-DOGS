import axios from 'axios';


export const GET_DOGS = 'GET_DOGS';
export const GET_DOG_DETAIL = 'GET_DOG_DETAIL';
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS';
export const CREATE_DOG = 'CREATE_DOG';
export const BIG_FILTER = 'BIG_FILTER';
export const ORDER_BY_BREED = 'ORDER_BY_BREED';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const FILTER_DOGS_BY_TEMPERAMENT = 'FILTER_DOGS_BY_TEMPERAMENT';
export const SEARCH_BREED_NAME = 'SEARCH_BREED_NAME' ;



export const getDogs = () => {
    return async (dispatch) => {
        let info = await axios.get('http://localhost:3001/dogs');
        dispatch({ type: GET_DOGS, payload: info.data });
    }
}

export const getDogDetail = (id) => {
    return async (dispatch) => {
        let info = await axios.get(`http://localhost:3001/dogs/${id}`);
        dispatch({ type: GET_DOG_DETAIL, payload: info.data });
    }
}

export const getTemperaments = () => {
    return async (dispatch) => {
        let info = await axios.get('http://localhost:3001/temperaments');
        dispatch({ type: GET_TEMPERAMENTS, payload: info.data });
    }
}


export const createDog = (payload) => {
    return async () => {
        let info = await axios.post('http://localhost:3001/dogs', payload);
        return info;
    }
}


export const searchBreedName = (payload) => {
    return async (dispatch) => {
        try {
            let info = await axios.get(`http://localhost:3001/dogs?name=${payload}`);
            return dispatch({ type: 'SEARCH_BREED_NAME', payload: info.data })
        } catch (error) {
            console.log('error en funcion searchBreedName', error);
        }
    }
}


export const filterCreated = (payload) => {
    return {
        type: 'BIG_FILTER',
        payload
    }
}

export const orderByBreed = (payload) => {
    return {
        type: 'ORDER_BY_BREED',
        payload
    }
}


export const orderByWeight = (payload) => {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}


export const filterDogsByTemperament = (payload) => {
    return {
        type: 'FILTER_DOGS_BY_TEMPERAMENT',
        payload
    }
}