import React from 'react';
import { useSelector } from 'react-redux';
import FetchPlants from '../Components/FetchPlants';
import { useNavigate } from 'react-router';

const Home = () => {
    const isLogged = useSelector((state) => state.user.username)

    const navigate = useNavigate()

    const showDetailsHandler = (plant) => {
        navigate(`/browse/${plant.id}`)
    }



    return (
        <>
            <div>
                {isLogged ?
                    <h1>Welcome {isLogged}!</h1> :
                    <h1>Welcome to Smart Plant Panel!</h1>
                }
            </div>
            <div>
                <br />
                <FetchPlants onSelectPlant={(plant) => showDetailsHandler(plant)} />
            </div>
        </>

    );
};

export default Home;