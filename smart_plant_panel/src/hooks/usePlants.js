import { useEffect, useState } from "react"

export function useGetPlants({ category, plantName, limit, reloadTrigger=null }) {
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
    }, [category, plantName, limit, reloadTrigger]);

    return { plants, loading }
}