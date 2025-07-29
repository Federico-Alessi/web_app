import { useEffect, useState } from "react"

export function useGetPlants({ id, category, plantName, limit, reloadTrigger = null }) {
    const [plants, setPlants] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        let timeout

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
                const response = await fetch(url, { signal });
                const result = await response.json();
                setPlants(result);

            } catch (e) {
                if (e.name != 'AbortError')
                alert('Database not available')

            } finally {
                timeout = setTimeout(() => setLoading(false), 700);
            }
        };

        fetchPlantsData();

        return () => {
            clearTimeout(timeout) //clean timeout
            controller.abort() //abort fetch
        }

    }, [category, plantName, limit, reloadTrigger, id]);


    return { plants, loading }
}