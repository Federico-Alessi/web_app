import React from "react";

const Plant = ({ plant, onExit }) => {
    const { plantName, image, category, description } = plant

    return (
        <div>
            <button onClick={() => onExit(null)}>X</button>
            <h1>{plantName}</h1>
            <img src={`/${image}`} alt={plantName} id="plant-pic" />
            <br />
            <p><b>Category: </b>{category}</p>
            <p><b>Description: </b>{description}</p>
        </div>
    )
}

export default Plant