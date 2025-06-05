import React, { useState } from "react";


const AddPlant = () => {
    const [newPlant, setNewPlant] = useState({
        id: null,
        image: "600x400.png",
        plantName: "",
        category: "",
        description: ""
    })
    //handles user changes
    const handleChange = (e) =>{
        const { name, value} = e.target
        setNewPlant({...newPlant, [name]: value})
    }
    //passes the new plant to the parent of AddPlant
    const handleNewPlant = (e) =>{
        e.preventDefault()
        const plant = {...newPlant, id: Date.now()}
        setNewPlant({
            id: null,
            image: "600x400.png",
            plantName: "",
            category: "",
            description: ""
        })

    }
    return(
        <form onSubmit={handleNewPlant}>
            <label>
                Picture: <br/>
                <img src={newPlant.image} alt="600x600" style={{ width: "100%", maxWidth: "600px" }}/>
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
                    rows="10"
                    value={newPlant.description}
                    onChange={handleChange}
                    required/>
            </label>
        
        </form>
    )
}

export default AddPlant