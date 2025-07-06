import { useEffect, useState } from "react"

export function useGetPlants({ reloadFlag = false, ids = null, category, plantName, limit }) {
    const [plants, setPlants] = useState([])
    const [loading, setLoading] = useState(false)
    //PlantFilters
    //const [category, setCategory] = useState("");
    //const [plantName, setPlantName] = useState("");
    //const [limit, setLimit] = useState("20")

    useEffect(() => {
        const fetchPlantsData = async () => {
            setLoading(true)
            let url = `http://localhost:5000/plants?_limit=${limit}`
            if (category) url += `&category=${category}`
            if (plantName) url += `&plantName_like=${plantName}`
            if (ids) ids.map(id => url += `&id=${id}`)

            try {
                const response = await fetch(url);
                const result = await response.json();
                setPlants(result);
            } catch {
                alert('Database not available')
            } finally {
                setTimeout(() => setLoading(false), 700);
            }
        };

        fetchPlantsData();
    }, [category, plantName, limit, ids, reloadFlag]);

    return { plants, loading }
}

export async function editPlant({ editedPlant }) {
    console.log(editedPlant)
    try {
        const response = await fetch(`http://localhost:5000/plants/${editedPlant.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedPlant)
        })
        if (response.ok) {
            return 'Plant edited'
        } else {
            return 'Error while editing the plant'
        }
    } catch {
        return 'Error while connecting to the database'
    }
}

export async function removePlant(plant) {
    try {
        const response = await fetch(`http://localhost:5000/plants/${plant.id}`, {
            method: "DELETE"
        });
        if (response.ok) {
            return "Plant removed from database"
        }
    } catch {
        return "Error while connecting to the database"
    }
}