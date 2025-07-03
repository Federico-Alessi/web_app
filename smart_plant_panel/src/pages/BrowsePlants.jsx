import React, { useState } from 'react';
import FetchPlants from '../Components/FetchPlants';
import Plant from '../Components/Plant';
import { addToNursery } from '../redux/NurseryActions';
import { useDispatch } from 'react-redux';

const BrowsePlants = () => {
    const [selectedPlant, setSelectedPlant] = useState(null)
    const dispatch = useDispatch()
    
    return (
        <div>
            <br/>
            {selectedPlant ? (
                <div>
                <button onClick={() => setSelectedPlant(null)}>↩</button>
                <Plant {...selectedPlant} />
                <button onClick={() => dispatch(addToNursery(selectedPlant.id))}>Add to nursery</button>
                </div>
            ) : (
                <FetchPlants onSelectPlant={setSelectedPlant}/>)}
        </div>
    );
};

export default BrowsePlants;