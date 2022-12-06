import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchBreedName } from '../redux/actions';
import './styles/SearchBar.css';


const SearchBar = () => {
    const dispatch = useDispatch();

    const [breed, setBreed] = useState("");

    const handleChange = (event) => {
        event.preventDefault();
        setBreed(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(searchBreedName(breed));
    }


    return (
        <div>
            <input type='text' placeholder='Search Dog...' onChange={(event) => handleChange(event)} className="input"/>

            <button type='submit' onClick={(event) => handleSubmit(event)} className='botonbuscar'>Search</button>
        </div>
    )
}

export default SearchBar;