import React, { useState } from 'react';
import FetchPlants from '../Components/FetchPlants';
import { useDispatch, useSelector } from 'react-redux';
import Plant from '../Components/Plant';
import { useNavigate } from 'react-router';
import { removeFromNursery } from '../redux/NurseryActions';
import Alert from '@mui/material/Alert';

const MyNursery = () => {
    const [selectedPlant, setSelectedPlant] = useState(null)
    const [flag, setFlag] = useState(false) //flag for the alert
    const myPlants = useSelector((state) => state.nursery.plants)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const removeHandler = () => {
        dispatch(removeFromNursery(selectedPlant))
        setSelectedPlant(null)
        setFlag(true)
        setTimeout(() => { setFlag(false) }, 5000)
    }

    return (
        <div>
            {flag && <Alert severity='info' id='alert' onClose={() => { setFlag(false) }}>Plant removed from nursery</Alert>}
            <h1>Nursery</h1>
            <>
                {myPlants.length > 0 ? (
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
                                {myPlants.map((plant) => (
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
                                        <td><button onClick={() => setSelectedPlant(plant)}>👁️</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {selectedPlant &&
                            <div className="display-overlay">
                                <Plant plant={selectedPlant} onExit={setSelectedPlant} />
                                <button onClick={removeHandler}>Remove from Nursery</button>
                            </div>
                        }
                    </>
                ) : (
                    <p>No plants in your nursery yet. Visit <u style={{ cursor: "pointer" }} onClick={() => navigate("/browse")}>Browse Plants</u></p>
                )}
            </>
        </div>
    );
};

export default MyNursery;