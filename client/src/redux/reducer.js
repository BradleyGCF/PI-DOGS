import {
    CREATE_DOG,
    GET_DOGS,
    GET_DOG_DETAIL,
    GET_TEMPERAMENTS,
    BIG_FILTER,
    ORDER_BY_BREED,
    ORDER_BY_WEIGHT,
    FILTER_DOGS_BY_TEMPERAMENT,
    SEARCH_BREED_NAME,
} from './actions';

const initialState = {
    dogs: [],
    allDogs: [],
    dogsDetail: {},
    temperaments: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        // -------------------------------------------------------------------------------
        case GET_DOGS:
            return { ...state, dogs: action.payload, allDogs: action.payload };

        // ------------------------------------------------------------------------------

        case GET_DOG_DETAIL:
            return { ...state, dogsDetail: action.payload };

        // -------------------------------------------------------------------------------

        case GET_TEMPERAMENTS:
            return { ...state, temperaments: action.payload };

        // ---------------------------------------------------------------------------------

        case CREATE_DOG:
            return {
                ...state,
            }

        // -------------------------------------------------------------------------------


        case BIG_FILTER:
            const allDogs2 = state.allDogs;
            const createdFilter =
                action.payload === "All"
                    ? allDogs2
                    : allDogs2.filter((e) => {
                        if (action.payload === "Created") {
                            if (e.createdDB) {
                                return e;
                            }
                        } else if (action.payload === "name") {
                            if (!e.createdDB) {
                                return e;
                            }
                        }
                    });
            return {
                ...state,
                dogs: createdFilter
            };

        // ----------------------------------------------------------------------------------

        case ORDER_BY_BREED:
            let orderedArr = action.payload === 'Asc' ? state.dogs.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
            }) :
                state.dogs.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                })

            return {
                ...state,
                dogs: orderedArr
            }

        // ---------------------------------------------------------------------------------

        case ORDER_BY_WEIGHT:
            let orderedArr2 = action.payload === 'Light' ? state.dogs.sort((a, b) => {
                if (a.weight > b.weight) return 1;
                if (b.weight > a.weight) return -1;
                return 0;
            }) :
                state.dogs.sort((a, b) => {
                    if (a.weight > b.weight) return -1;
                    if (b.weight > a.weight) return 1;
                    return 0;
                })

            return {
                ...state,
                dogs: orderedArr2
            }

        // ---------------------------------------------------------------------------------

        case FILTER_DOGS_BY_TEMPERAMENT:
            const allDogs3 = state.allDogs;
            const tempDogs = allDogs3.filter((dog) => {
                if (dog.temperaments) {
                    const temperament = dog.temperaments.map((dog) => dog.name)
                    return temperament.includes(action.payload)
                }


                if (dog.temperament) return dog.temperament.includes(action.payload);
                return null;
            })

            return {
                ...state,
                dogs: action.payload === 'Temps' ? allDogs3 : tempDogs,
            }

        // -------------------------------------------------------------------------------


        case SEARCH_BREED_NAME:
            return {
                ...state,
                dogs: action.payload
            }

        // ----------------------------------------------------------------------------------


        default:
            return state;
    }
}

export default rootReducer;