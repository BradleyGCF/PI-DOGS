import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createDog, getTemperaments } from '../redux/actions';
import './styles/CreateDog.css';


const recargar = () => {
    window.location.reload(false);
}

const validation = (input) => {
    let errors = {};

    if (!input.name || !/^[a-zA-Z\s]*$/.test(input.name)) errors.name = 'Breeds name is invalid!';

    if (input.minHeight > input.maxHeight) errors.minHeight = "Min Height can't surmount Max Height!";

    if (input.minWeight > input.maxWeight) errors.minWeight = "Min Weight can't surmount Max Weight!";

    if (input.minHeight <= 10) errors.minHeight = "Min Height should be higher than 10 CM!";

    if (input.maxWeight <= 2) errors.maxWeight = "Max Weight should be higher than 2KG";

    if (!input.minHeight) errors.minHeight = 'Min Height is required!';

    if (!input.maxHeight) errors.maxHeight = 'Max height is required!';

    if (!input.minWeight) errors.minWeight = 'Min Weight is required!';

    if (!input.maxWeight) errors.maxWeight = 'Max Weight is required!';

    if (input.life_span < 0) errors.life_span = "LifeSpan of the breed can't be lower than 0";

    if (input.life_span > 20) errors.life_span = "Older than 20 years? Wow your breed is amazing! But it isn't possible, try again.";


    return errors;
}


const CreateDog = () => {

    const dispatch = useDispatch();

    const temperaments = useSelector((state) => state.temperaments);


    const [input, setInput] = useState({
        name: "",
        minWeight: "",
        maxWeight: "",
        minHeight: "",
        maxHeight: "",
        life_span: "",
        image: "",
        temperaments: []
    });

    const [errors, setErrors] = useState({}); // estados locales para los errores


    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    }


    const handleTemperaments = (event) => {
        setInput({
            ...input,
            temperaments: [...new Set([...input.temperaments, event.target.value])]
        });
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(input));
        const errorSave = validation(input);
        if (Object.values(errorSave).length !== 0) alert("You must fullfill all the required conditions");
        else {
            dispatch(createDog(input));
            // navigate('/home');
            alert('Dog created succesfully!');
            setInput({
                name: "",
                minHeight: "",
                minWeight: "",
                maxHeight: "",
                maxWeight: "",
                life_span: "",
                image: "",
                temperaments: []
            });
        }
    };


    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);



    return (
        <div className="container2">
            <Link to='/home' ><button className="volver">Back</button></Link>
            <button type="submit" onClick={recargar} className="recargar">Reload</button>

            <h1 id="createdog">Create your own Breed!</h1>                           
            <form onSubmit={event => handleSubmit(event)}>

                <div className="labels">
                    <label>Name: </label>
                    <input onChange={(event) => handleChange(event)} value={input.name} type="text" name="name" placeholder="Breed's name" />
                    {errors.name && <p>{errors.name}</p>}
                </div>


                <div className="ImageBro">
                    <label>Image: </label>
                    <input onChange={(event) => handleChange(event)} value={input.image} type="text " name="image" placeholder="Breed's image URL" />
                </div>


                <div className="MinHeight">
                    <label>Min Height: </label>
                    <input onChange={(event) => handleChange(event)} value={input.minHeight} type="number" min='10' max='99' name="minHeight" placeholder="Min Height" />
                    {errors.minHeight && <p>{errors.minHeight}</p>}
                </div>


                <div className="MaxHeight">
                    <label>Max Height: </label>
                    <input onChange={(event) => handleChange(event)} value={input.maxHeight} type="number" min='11' max='99' name="maxHeight" placeholder="Max Height" />
                    {errors.maxHeight && <p>{errors.maxHeight}</p>}
                </div>

                <div className="MinWeight">
                    <label>Min Weight: </label>
                    <input onChange={(event) => handleChange(event)} value={input.minWeight} type="number" min='10' max='99' name="minWeight" placeholder="Min Weight" />
                    {errors.minWeight && <p>{errors.minWeight}</p>}
                </div>


                <div className="maxWeight">
                    <label>Max Weight: </label>
                    <input onChange={(event) => handleChange(event)} value={input.maxWeight} type="number" min='11' max='99' name="maxWeight" placeholder="Max Weight" />
                    {errors.maxWeight && <p>{errors.maxWeight}</p>}
                </div>


                <div className="lifeSpanMen">
                    <label>LifeSpan: </label>
                    <input onChange={(event) => handleChange(event)} value={input.life_span} type="number" min='1' max='20' name="life_span" placeholder="Life Span" />
                    {errors.life_span && <p>{errors.life_span}</p>}
                </div>


                <div className="temperamentsMen">
                    <label>Temperament: </label>
                    <select onChange={(event) => handleTemperaments(event)}>
                        {temperaments?.map((temp) => (
                            <option value={temp} key={temp.id}>{temp}</option>
                        ))}
                    </select>
                </div>


                <div className="temperamentsItems">
                    <ul>{input.temperaments.map((el) => el + ". " + "\n")}</ul>
                </div>

                <div>
                    <button className="createButton" type='submit' disabled={input.temperaments.length < 2 || input.temperaments.length >= 5 ? true : false}>Create Dog</button>
                </div>
            </form>
        </div>
    )
}

export default CreateDog;