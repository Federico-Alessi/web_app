import React, { useState } from 'react';
import FetchPlants from '../Components/FetchPlants';
import Plant from '../Components/Plant';
import { addToNursery } from '../redux/NurseryActions';
import { useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';

const BrowsePlants = () => {
    const [selectedPlant, setSelectedPlant] = useState(null)
    const dispatch = useDispatch()
    const [flag, setFlag] = useState(false)

    const nurseryHandler = () => {
        console.log(selectedPlant)
        dispatch(addToNursery(selectedPlant))
        setSelectedPlant(null)
        setFlag(true)
        setTimeout(() => { setFlag(false) }, 5000)
    }

    return (
        <div>
            {flag ? <Alert severity='success' onClose={() => { setFlag(false) }} id='alert'>Plant added to nursery</Alert> : null}
            <br />
            <FetchPlants onSelectPlant={setSelectedPlant} />

            <>
                {selectedPlant &&
                    <div className="display-overlay">
                        <Plant plant={selectedPlant} onExit={setSelectedPlant} />
                        <button onClick={nurseryHandler}>Add to Nursery</button>
                    </div>
                }
            </>
        </div>
    );
};

export default BrowsePlants;