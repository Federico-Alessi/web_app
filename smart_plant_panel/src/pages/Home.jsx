import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
    const isLogged = useSelector((state) => state.user.username)

    return (
        <div>
            {isLogged ?
                <h1>Welcome {isLogged}!</h1> :
                <h1>Welcome to Smart Plant Panel!</h1>
            }
        </div>
    );
};

export default Home;