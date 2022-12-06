import React from 'react';
import './styles/Paginado.css';


const Paginado = ({ dogsPerPage, dogs, paginado }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(dogs / dogsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <div className='Div-Paginado'>
                {pageNumbers?.map((number) => (
                    <button className='Btn-Paginado' onClick={() => paginado(number)}>
                        {number}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Paginado;