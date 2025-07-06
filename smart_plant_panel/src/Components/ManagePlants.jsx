import React, { useState } from "react";
import FetchPlants from "./FetchPlants";
import Plant from "./Plant";
import EditPlants from "./EditPlants";
import { removePlant } from "../hooks/usePlants";

const ManagePlants = () => {
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [editPlant, setEditPlant] = useState(null)

    const handleRemovePlant = async (plant) => {
        /*
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
        */
        const removal = await removePlant(plant)
        alert(removal)

        setSelectedPlant(null)
    }

    return (
        <>
            {selectedPlant ? (
                <div>
                    {editPlant ? (
                        <>
                            <br />
                            <EditPlants plant={selectedPlant} onFinishEditing={(updatedPlant) => {
                                if (updatedPlant) setSelectedPlant(updatedPlant)
                                setEditPlant(null)
                            }} />
                        </>
                    ) : (
                        <>
                            <br />
                            <button onClick={() => setSelectedPlant(null)}>↩</button>
                            <Plant {...selectedPlant} />
                            <button onClick={() => handleRemovePlant(selectedPlant)}>🗑️</button>
                            <button onClick={() => setEditPlant(selectedPlant)}>Edit</button>
                        </>
                    )}
                </div>
            ) : (
                <FetchPlants onSelectPlant={setSelectedPlant} />
            )}
        </>
    )
}

export default ManagePlants