import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getDogs, filterCreated, orderByBreed, orderByWeight, getTemperaments, filterDogsByTemperament } from '../redux/actions'
import DogCards from './DogCards';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import './styles/Home.css';

const Home = () => {

    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments)
    const dogs = useSelector((state) => state.dogs);

    // A partir de aquí lo necesario para el Paginado
    const [currentPage, setCurrentPage] = useState(1); // Inicio en la primer página (1)
    const [dogsPerPage, setDogsPerPage] = useState(8); // Cuantos elementos muestro por cada página?
    const indexLastDog = currentPage * dogsPerPage; // 1 * 8
    const indexFirstDog = indexLastDog - dogsPerPage; // 8 - 8 
    const currentDogs = dogs.slice(indexFirstDog, indexLastDog); // corto el array de 0 - 7       pag1: 0---------7 | pag2: 8--------------15
    const [order, setOrder] = useState("");


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const handleClick = (event) => { // esto es para resetear
        event.preventDefault();
        dispatch(getDogs());
    }
    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch]);

    const handlePrev = (e) => {
        e.preventDefault()
        setCurrentPage(currentPage - 1);
    }

    const handleNext = (e) => {
        e.preventDefault();
        setCurrentPage(currentPage + 1);
    }


    const handleFilterCreated = (event) => {
        dispatch(filterCreated(event.target.value));
    }

    const handleOrderByBreed = (event) => {
        event.preventDefault();
        dispatch(orderByBreed(event.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${event.target.value}`);
    }

    const handleOrderByWeight = (event) => {
        event.preventDefault();
        dispatch(orderByWeight(event.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${event.target.value}`);
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);

    // ------------------------------------------------------
    

    const handleFilterDogsByTemperament = (e) => {
        e.preventDefault();
        dispatch(filterDogsByTemperament(e.target.value));
        setCurrentPage(1);
    }



    return (
        <div className='MasterContainer'>
            <div className='ContainerBotones'>
                <Link to='/' >
                    <button id='inicio'>Inicio</button>
                </Link>

                <Link to='/creation' >
                    <button id='create'>Create Dog</button>
                </Link>
                <button onClick={(e) => handleClick(e)} id='recargar'>Recargar</button>
            </div>




            <div className='Select'>
                {/* Ordenamiento */}
                <select onChange={(event) => handleOrderByBreed(event)} id='order'>
                    <option value='Asc-Desc Filter'>Alphabetic Order</option>
                    <option value="Asc">Ascendente</option>
                    <option value="Desc">Descendente</option>
                </select>

                {/* filtrado por peso */}
                <select onChange={(event) => handleOrderByWeight(event)} id='peso'>
                    <option value='Weight'>Weight Order</option>
                    <option value='Light'>Mayor Peso</option>
                    <option value='Heavy'>Menor Peso</option>
                </select>


                {/*filtrado por razas */}
                <select onChange={(event) => handleFilterCreated(event)} id='filterSelect'>
                    <option hidden='FilterDogs'>Filter Dogs</option>
                    <option value='All'>All Dogs</option>
                    <option value="name">Existent</option>
                    <option value="Created">Created</option>
                </select>


                <select onChange={(e) => handleFilterDogsByTemperament(e)} id='tempOption'>
                    <option value="Temps" >Filtrar por Temperaments</option>
                    {temperaments.map((el) => (
                        <option value={el} key={el.id}>{el}</option>
                    ))}
                </select>
            </div>


            {/* renderizado de la SearchBar */}
            <div className='searchbar'>
                <SearchBar />
            </div>

            <div className='cards'>
                {/* Renderizado de las DogCard */}
                {/* mapeo el arreglo del paginado */}
                {currentDogs?.map((el) => (
                    <DogCards
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        image={el.image ? el.image : "No pudo cargar la imagen"}
                        height={el.height}
                        weight={el.weight}
                        life_span={el.life_span}
                        temperament={el.temperament}
                        temperaments={el.temperaments}
                        createdDB={el.createdDB}
                    />
                ))}
            </div>
            
            {/* Renderizado del paginado */}
            <div className='paginado'>
                <Paginado
                    dogsPerPage={dogsPerPage}
                    dogs={dogs.length}
                    paginado={paginado}
                />
                <button onClick={(e) => handlePrev(e)} disabled={currentPage <= 1}>{"<<"}</button>
                <button onClick={(e) => handleNext(e)} disabled={currentDogs.length < 8}>{">>"}</button>
            </div>
        </div>
    )
}

export default Home;











