import React from "react";
import { Link } from 'react-router-dom';
import './styles/DogCards.css';


const DogCards = ({ id, name, image, temperaments, temperament, weight, createdDB, height }) => {
    return (

        <div className="card-container">
            <div>
                <h2 className="name">{name}</h2>
            </div>
            <div className="image-container">
                <img src={image} alt="Dog" />
            </div>
            <div className="card-content">
                <h4 className="temperaments">{createdDB ? temperaments.map((e) => e.name).join(", ") : temperament}</h4>
                <h5 className="heightAndWeight ">Weight: {weight} kg</h5>
                <h5 className="heightAndWeight">Height: {height} cm</h5>
                <Link to={`/home/${id}`}>
                    <button className="btn">Learn more!</button>
                </Link>
            </div>
        </div>
    )
}

// Imagen
// Nombre
// Temperamento
// Peso

export default DogCards;