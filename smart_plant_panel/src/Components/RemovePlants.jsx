import React, { useState } from "react";
import FetchPlants from "./FetchPlants";
import Plant from "./Plant";

const RemovePlants = () => {
    const [selectedPlant, setSelectedPlant] = useState(null);

    const removePlant = async (plant) => {
        try {
            const response = await fetch(`http://localhost:5000/plants/${plant.id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                alert("Plant removed from database")
            }
        } catch {
            alert("Plant not found")
        }

        setSelectedPlant(null)
    }

    return (
        <>
            {selectedPlant ? (
                <div>
                    <br />
                    <button onClick={() => setSelectedPlant(null)}>↩</button>
                    <Plant {...selectedPlant} />
                    <button onClick={() => removePlant(selectedPlant)}>🗑️</button>
                </div>
            ) : (
                <FetchPlants onSelectPlant={setSelectedPlant} />
            )}
        </>
    )
}

export default RemovePlants