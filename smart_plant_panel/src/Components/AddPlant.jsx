import React, { useState } from "react";


const AddPlant = () => {
    const [newPlant, setNewPlant] = useState({
        id: "",
        image: "600x400.png",
        plantName: "",
        category: "",
        description: ""
    })
    //handles user changes
    const handleChange = (e) =>{
        const { name, value, type, files} = e.target
        if (type== "file" && files[0]) {
            //setNewPlant({...newPlant, image: URL.createObjectURL(files[0]) })
        } else {
            setNewPlant({...newPlant, [name]: value})
        }
    }
    //passes the new plant to the parent of AddPlant
    const handleNewPlant = async (e) =>{
        e.preventDefault()
        const plant = { ...newPlant, id: Date.now().toString() };
        try {
            const response = await fetch("http://localhost:5000/plants", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(plant)
            });
            if (response.ok) {
                alert("plant added!");
                setNewPlant({
                    id: null,
                    image: "600x400.png",
                    plantName: "",
                    category: "",
                    description: ""
                })
            } else {
                alert("something went wrong!")
            }
        } catch {
            alert ("Failed to connect to server.")
        }
    }
    return(
        <form onSubmit={handleNewPlant}>
            <label>
                Picture: <br/>
                <img src={newPlant.image} alt="600x400" style={{ width: "100%", maxWidth: "600px" }}/>
                <br/><input
                    name="image"
                    type="file"
                    onChange={handleChange}
                />
            </label>
            <label>
                Plant Name: <br/><input
                    name="plantName"
                    type="text"
                    value={newPlant.plantName}
                    onChange={handleChange}
                    required/>
            </label>
            <br/>
            <label>
                Plant category: <br/>
                    <select
                        name="category"
                        value={newPlant.category}
                        onChange={handleChange}
                        required>
                            <option value="" disabled>Choose a category</option>
                            <option value="greenplant">Green Plant</option>
                            <option value="succulent">Succulent</option>
                            <option value="flower">Flower</option>
                        </select>
            </label>
            <br/>
            <label>
                Plant Description: <br/><textarea
                    name="description"
                    rows="10"
                    value={newPlant.description}
                    onChange={handleChange}
                    required/>
            </label>
            <br></br>
            <button type="submit">Add</button>
        
        </form>
    )
}

export default AddPlant