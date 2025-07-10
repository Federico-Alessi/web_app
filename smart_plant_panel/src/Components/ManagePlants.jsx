import React, { useState } from "react";
import FetchPlants from "./FetchPlants";
import Plant from "./Plant";
import EditPlants from "./EditPlants";
import { removePlant } from "../api/plantsApi";
import { verifyLoggedUser } from "../api/usersApi";
import { useSelector } from "react-redux"

const ManagePlants = () => {
    const [selectedPlant, setSelectedPlant] = useState(null)
    const [editPlant, setEditPlant] = useState(null)
    const [reloadPlants, setReloadPlants] = useState(false)
    const [confirmationNeeded, setConfirmationNeeded] = useState(false)
    const [password, setPassword] = useState('')
    const username = useSelector((state) => state.user.username)


    const handleRemovePlant = async (e) => {
        e.preventDefault()
        const isVerified = await verifyLoggedUser({ username: username, rawPassword: password })

        if (isVerified) {
            setConfirmationNeeded(false)
            const removal = await removePlant(selectedPlant)
            alert(removal)
            setReloadPlants(state => !state)
            setSelectedPlant(null)

        } else {
            alert('Incorrect password')
        }
    }


    return (
        <>
            {confirmationNeeded &&
                <div className="display-overlay" style={{ zIndex: 1000 }}>
                    <button onClick={() => setConfirmationNeeded(false)}>X</button>
                    <h3>To delete {selectedPlant.plantName} insert your password here:</h3>
                    <form onSubmit={handleRemovePlant}>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        ></input>
                        <button type="submit">Confirm</button>
                    </form>
                </div>
            }


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
                            <button onClick={() => setConfirmationNeeded(true)}>🗑️</button>
                            <button onClick={() => setEditPlant(selectedPlant)}>Edit</button>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default ManagePlants