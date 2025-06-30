import React, { useEffect, useState } from "react";

const FetchPlants = ({onSelectPlant}) => {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/plants`);
                const result = await response.json();
                setPlants(result);
            } catch {
                return <h1>Database not available</h1>;
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <table>
                <tr>
                    <th style={{ width: "20%" }}>Name</th>
                    <th style={{ width: "20%" }}>Category</th>
                    <th style={{ width: "50%" }}>Description</th>
                    <th style={{ width: "10%" }}>Show</th>
                </tr>
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
                        <td><button onClick={() => onSelectPlant(plant)}/></td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default FetchPlants;
