import React from "react";

const Plant = ({plantName, image, category, description}) => {
    return (
        <div>
            <h1>{plantName}</h1>
            <img src={image} alt={name}/>
            <h3>Category:</h3>
            <p>{category}</p>
            <h3>Description</h3>
            <p>{description}</p>
        </div>
    )
}

export default Plant