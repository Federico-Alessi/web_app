import React, { useState } from "react";
import FetchPlants from "./FetchPlants";
import Plant from "./Plant";
import EditPlants from "./EditPlants";
import { removePlant } from "../api/plantsApi";

const ManagePlants = () => {
    const [selectedPlant, setSelectedPlant] = useState(null)
    const [editPlant, setEditPlant] = useState(null)
    const [reloadPlants, setReloadPlants] = useState(false)

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
        setReloadPlants(state => !state)
        setSelectedPlant(null)
    }

    return (
        <>
            {editPlant ? (
                <>
                    <EditPlants plant={selectedPlant} onFinishEditing={(updatedPlant) => {
                        if (updatedPlant) setSelectedPlant(updatedPlant)
                        setEditPlant(null)
                    }} />
                </>
            ) : (
                <>
                    <FetchPlants onSelectPlant={setSelectedPlant} trigger={reloadPlants} />
                    {selectedPlant && (
                        <div className="display-overlay">
                            <Plant plant={selectedPlant} onExit={setSelectedPlant} />
                            <button onClick={handleRemovePlant}>🗑️</button>
                            <button onClick={() => setEditPlant(selectedPlant)}>Edit</button>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default ManagePlants