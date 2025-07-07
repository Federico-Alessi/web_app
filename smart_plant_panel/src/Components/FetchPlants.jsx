import React, { useState } from "react";
import PlantFilters from "./PlantFilters";
import { SpinnerRoundOutlined } from "spinners-react";
import BlankSpace from "./BlankSpace";
import { useGetPlants } from "../hooks/usePlants";

const FetchPlants = ({ onSelectPlant, trigger=null }) => {
    //const [plants, setPlants] = useState([]);
    //const [loading, setLoading] = useState(false);
    //PlantFilters
    const [category, setCategory] = useState("");
    const [plantName, setPlantName] = useState("");
    const [limit, setLimit] = useState("20")
    const { plants, loading } = useGetPlants({ category: category, plantName: plantName, limit: limit, reloadTrigger: trigger })

    /*
    useEffect(() => {
        const fetchPlantsData = async () => {
            setLoading(true)
            let url = `http://localhost:5000/plants?_limit=${limit}`
            if (category) url += `&category=${category}`
            if (plantName) url += `&plantName_like=${plantName}`
            //if (ids) url += ids.map(id => `&id=${id}`) never trust AI
            if (ids && ids.length <= limit) {
                ids.map(id => url+= `&id=${id}`)
            } else if (ids && ids.length > limit) {
                setLimit(ids.length)
                ids.map(id => url+= `&id=${id}`)
            }
            
            try {
                const response = await fetch(url);
                const result = await response.json();
                setPlants(result);
            } catch {
                return <h1>Database not available</h1>;
            } finally {
                setTimeout(() => setLoading(false), 700);
            }
        };

        fetchPlantsData();
    }, [category, plantName, limit, ids]);
    */

    return (
        <>
            <PlantFilters setCategory={setCategory} setName={setPlantName} />
            {loading ? (
                <>
                    <SpinnerRoundOutlined />
                    <br />
                </>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: "20%" }}>Name</th>
                                <th style={{ width: "20%" }}>Category</th>
                                <th style={{ width: "50%" }}>Description</th>
                                <th style={{ width: "10%" }}>Show</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plants.map((plant) => (
                                <tr key={plant.id}>
                                    <td>
                                        <p>{plant.plantName}</p>
                                    </td>
                                    <td>
                                        <p>{plant.category}</p>
                                    </td>
                                    <td style={{ width: "60%" }}>
                                        <p style={{
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            width: "100%",
                                            margin: 0
                                        }}>{plant.description}</p>
                                    </td>
                                    <td><button onClick={() => onSelectPlant(plant)}>👁️</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <BlankSpace />
                    <button onClick={() => setLimit(prev => (Number(prev) + 20).toString())}>Load More</button>

                </>
            )}
        </>
    );
};

export default FetchPlants;
