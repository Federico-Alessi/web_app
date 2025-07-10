import { useEffect, useState } from "react"

export function useGetPlants({ id, category, plantName, limit, reloadTrigger = null }) {
    const [plants, setPlants] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchPlantsData = async () => {
            setLoading(true)

            let url = `http://localhost:5000/plants`

            if (id) {
                url += `/${id}`

            } else {
                url += `?_limit=${limit}`
                if (category) url += `&category=${category}`
                if (plantName) url += `&plantName_like=${plantName}`
            }


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
    }, [category, plantName, limit, reloadTrigger, id]);


    return { plants, loading }
}