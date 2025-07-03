import React, { useState } from 'react';
import FetchPlants from '../Components/FetchPlants';
import { useDispatch, useSelector } from 'react-redux';
import Plant from '../Components/Plant';
import { useNavigate } from 'react-router';
import { removeFromNursery } from '../redux/NurseryActions';

const MyNursery = () => {
    const [selectedPlant, setSelectedPlant] = useState(null)
    const myPlants = useSelector((state) => state.nursery.plants)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const removeHandler = () => {
        dispatch(removeFromNursery(selectedPlant.id))
        setSelectedPlant(null)
    }
    
    console.log(myPlants)
    return (
        <div>
            <h1>Nursery</h1>
            {selectedPlant ? (
                <>
                    <button onClick={() => setSelectedPlant(null)}>↩</button>
                    <Plant {...selectedPlant} />
                    <button onClick={() => removeHandler()}>Remove from nursery</button>
                </>
            ) : (
                <>
                    {myPlants.length > 0 ? (
                        <FetchPlants onSelectPlant={setSelectedPlant} ids={myPlants} />
                    ) : (
                        <p>No plants in your nursery yet. Visit <u style={{cursor: "pointer"}} onClick={() => navigate("/browse")}>Browse Plants</u></p>
                    )}
                </>
            )}
        </div>
    );
};

export default MyNursery;