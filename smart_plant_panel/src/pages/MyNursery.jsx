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
        dispatch(removeFromNursery(selectedPlant.id))
        setSelectedPlant(null)
        setFlag(true)
        setTimeout(() => {setFlag(false)}, 5000)
    }

    return (
        <div>
            {flag && <Alert severity='info' id='alert' onClose={() => {setFlag(false)}}>Plant removed from nursery</Alert>}
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
                        <p>No plants in your nursery yet. Visit <u style={{ cursor: "pointer" }} onClick={() => navigate("/browse")}>Browse Plants</u></p>
                    )}
                </>
            )}
        </div>
    );
};

export default MyNursery;