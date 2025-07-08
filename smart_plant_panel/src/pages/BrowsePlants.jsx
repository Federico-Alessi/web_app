import FetchPlants from '../Components/FetchPlants';
import { useNavigate } from 'react-router';

const BrowsePlants = () => {
    const navigate = useNavigate()

    const showDetailsHandler = (plant) => {
        navigate(`/browse/${plant.id}`)
    }

    return (
        <div>
            <br />
            <FetchPlants onSelectPlant={(plant) => showDetailsHandler(plant)} />
        </div>
    );
};

export default BrowsePlants;