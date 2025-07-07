import React, { useState } from "react";
import FetchPlants from "./FetchPlants";
import Plant from "./Plant";
import EditPlants from "./EditPlants";
import { removePlant } from "../hooks/usePlants";

const ManagePlants = () => {
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [editPlant, setEditPlant] = useState(null)

    const handleRemovePlant = async () => {
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
        const removal = await removePlant(selectedPlant)
        alert(removal)

        setSelectedPlant(null)
    }

    return (
        <>
            {selectedPlant &&
                <div className="display-overlay">
                    {editPlant ? (
                        <>
                            <EditPlants plant={selectedPlant} onFinishEditing={(updatedPlant) => {
                                if (updatedPlant) setSelectedPlant(updatedPlant)
                                setEditPlant(null)
                            }} />
                        </>
                    ) : (
                        <>
                            <Plant plant={selectedPlant} onExit={setSelectedPlant} />
                            <button onClick={handleRemovePlant}>🗑️</button>
                            <button onClick={() => setEditPlant(selectedPlant)}>Edit</button>
                        </>
                    )}
                </div>
            }

            <FetchPlants onSelectPlant={setSelectedPlant} />
        </>
    )
}

export default ManagePlants