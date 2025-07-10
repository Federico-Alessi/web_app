import React, { useState } from "react";
import PlantFilters from "./PlantFilters";
import { SpinnerRoundOutlined } from "spinners-react";
import BlankSpace from "./BlankSpace";
import { useGetPlants } from "../hooks/usePlants";

const FetchPlants = ({ onSelectPlant, trigger = null }) => {
    const [category, setCategory] = useState("");
    const [plantName, setPlantName] = useState("");
    const [limit, setLimit] = useState("20")
    const { plants, loading } = useGetPlants({ category: category, plantName: plantName, limit: limit, reloadTrigger: trigger })


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
