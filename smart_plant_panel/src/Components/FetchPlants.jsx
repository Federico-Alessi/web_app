import React, { useEffect, useState } from "react";

const FetchPlants = () => {
    const [plants, setPlants] = useState([])

    useEffect(() =>{
        const fetchData = async () =>{
            const response = await fetch(`http://localhost:5000/plants`)
            const result = await response.json()
            console.log(result)
            setPlants(result)
        }

        fetchData()
    }, [])

    return (
        <div>
            <ul>
                {plants.map((plant) => (
                    <li>
                        <h1>{plant.plantName}</h1>
                        
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default FetchPlants