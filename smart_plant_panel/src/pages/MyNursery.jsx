import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plant from '../Components/Plant';
import { useNavigate } from 'react-router';
import { removeFromNursery } from '../redux/NurseryActions';
import Alert from '@mui/material/Alert';
import PlantFilters from '../Components/PlantFilters'
import { addToNursery } from '../redux/NurseryActions';
import { getPlantById } from '../api/plantsApi';
import { removeFromUserNursery } from '../api/usersApi';
import { SpinnerRoundOutlined } from 'spinners-react';
import { removeIdFromUsrNursery } from '../redux/LoginActions'
import AutoAlert from '../Components/AutoAlert';


const MyNursery = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.id)
    const [selectedPlant, setSelectedPlant] = useState(null)
    const [message, setMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState(null)
    const myPlants = useSelector((state) => state.nursery.plants)
    const [filteredPlants, setFilteredPlants] = useState(myPlants)
    const [nameFilter, setNameFilter] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("")
    const userNursery = useSelector(state => state.user.nursery)
    const [loading, setLoading] = useState(false)


    // load plant in user's nursery if logged
    useEffect(() => {

        const userNurseryToLocal = async () => {
            for (const plantId of userNursery) {

                const plant = await getPlantById(plantId)

                if (plant) {
                    dispatch(addToNursery(plant))
                } else {
                    dispatch(removeIdFromUsrNursery({ plantId: plantId, userId: userId }))
                }
            }
        }
        setLoading(true)
        userNursery && userNurseryToLocal()
        setLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userNursery, dispatch])


    // filter plants
    useEffect(() => {
        let updatedPlants = myPlants

        if (categoryFilter.length > 0) {
            updatedPlants = updatedPlants.filter(plant => plant.category == categoryFilter)
        }

        if (nameFilter.length > 0) {
            updatedPlants = updatedPlants.filter(plant => plant.plantName.toLowerCase().includes(nameFilter.toLowerCase()))
        }

        setFilteredPlants(updatedPlants)

    }, [categoryFilter, nameFilter, myPlants])


    // remove plant from state nursery and user nursery
    const removeHandler = async () => {
        dispatch(removeFromNursery(selectedPlant)) //remove from store nursery

        // remove from user's nursery if logged
        if (userId) {
            const plantId = selectedPlant.id
            const userNursery = await removeFromUserNursery({ userId: userId, plantId: plantId })
            //setErrorFlag(!userNursery)
            setAlertSeverity(!userNursery ? 'error' : null)
            if (!userNursery) {
                setMessage('Error while removing the plant from your personal database')
                setTimeout(() => { setAlertSeverity(null) }, 5000)
            }
        }

        if (alertSeverity != 'error') {
            setSelectedPlant(null)
            setMessage('The plant has been removed from your Nursery')
            setAlertSeverity('success')
            //setInfoFlag(true)
            setTimeout(() => { setAlertSeverity(null) }, 5000)
        }
    }


    return (
        <div>
            <AutoAlert severity={alertSeverity} message={message} close={setAlertSeverity} />


            <h1>Nursery</h1>
            <>
                {myPlants.length > 0 ? (
                    <>
                        <PlantFilters setCategory={setCategoryFilter} setName={setNameFilter} />

                        {loading && <SpinnerRoundOutlined />}
                        {!loading &&
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
                                    {filteredPlants.map((plant) => (
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
                        }

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