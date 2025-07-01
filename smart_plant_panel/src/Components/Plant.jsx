import React from "react";

const Plant = ({plantName, image, category, description}) => {
    return (
        <div>
            <h1>{plantName}</h1>
            <img src={image} alt={name}/>
            <br/>
            <p><b>Category: </b>{category}</p>
            <p><b>Description: </b>{description}</p>
        </div>
    )
}

export default Plant