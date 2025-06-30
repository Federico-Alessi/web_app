import React, { useState } from 'react';
import FetchPlants from '../Components/FetchPlants';
import Plant from '../Components/Plant';

const BrowsePlants = () => {
    const [selectedPlant, setSelectedPlant] = useState(null)
    return (
        <div>
            <h1>browse</h1>
            {selectedPlant ? (
                <div>
                <button onClick={() => setSelectedPlant(null)}>Back</button>
                <Plant {...selectedPlant} />
                </div>
            ) : (
                <FetchPlants onSelectPlant={setSelectedPlant} />)}
        </div>
    );
};

export default BrowsePlants;