import React, { useState } from 'react';
import FetchPlants from '../Components/FetchPlants';
import Plant from '../Components/Plant';

const BrowsePlants = () => {
    const [selectedPlant, setSelectedPlant] = useState(null)
    return (
        <div>
            <br/>
            {selectedPlant ? (
                <div>
                <button onClick={() => setSelectedPlant(null)}>↩</button>
                <Plant {...selectedPlant} />
                </div>
            ) : (
                <FetchPlants onSelectPlant={setSelectedPlant}/>)}
        </div>
    );
};

export default BrowsePlants;