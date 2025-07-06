import React, { useState } from "react";
import { editPlant } from "../hooks/usePlants";

const EditPlants = ({ plant, onFinishEditing }) => {
    const [editedPlant, setEditedPlant] = useState({...plant})

    const handleChange = (e) => {
        const {name, value} = e.target
        setEditedPlant({...editedPlant, [name]: value})
    }

    const handleEditPlant = async (e) => {
        e.preventDefault()
        const response = await editPlant({editedPlant})
            alert(response)
        onFinishEditing(editedPlant)
    }

    return (
        <>
        <button onClick={() => onFinishEditing(null)}>↩</button>
        <form onSubmit={handleEditPlant}>
            <label>
                Picture: <br />
                <img src={editedPlant.image} alt="600x400" style={{ width: "100%", maxWidth: "600px" }} />
                <br /><input
                    name="image"
                    type="file"
                    onChange={handleChange}
                />
            </label>
            <label>
                Plant Name: <br /><input
                    name="plantName"
                    type="text"
                    value={editedPlant.plantName}
                    onChange={handleChange}
                    required />
            </label>
            <br />
            <label>
                Plant category: <br />
                <select
                    name="category"
                    value={editedPlant.category}
                    onChange={handleChange}
                    required>
                    <option value="" disabled>Choose a category</option>
                    <option value="greenplant">Green Plant</option>
                    <option value="succulent">Succulent</option>
                    <option value="flower">Flower</option>
                </select>
            </label>
            <br />
            <label>
                Plant Description: <br /><textarea
                    name="description"
                    rows="10"
                    value={editedPlant.description}
                    onChange={handleChange}
                    required />
            </label>
            <br></br>
            <button type="submit">Save</button>

        </form>
        </>
    )
}

export default EditPlants