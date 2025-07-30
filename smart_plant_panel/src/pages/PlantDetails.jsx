import { useNavigate, useParams } from "react-router"
import Plant from "../Components/Plant"
import { useGetPlants } from "../hooks/usePlants"
import { SpinnerRoundOutlined } from "spinners-react"
import BlankSpace from "../Components/BlankSpace"
import { useDispatch, useSelector } from "react-redux"
import { addToNursery } from "../redux/NurseryActions"
import { useState } from "react"
import Alert from "@mui/material/Alert"
import { addToUserNursery } from "../api/usersApi.js"
import AutoAlert from "../Components/AutoAlert.jsx"

const PlantDetails = () => {
    const navigate = useNavigate()
    const { plantId } = useParams()
    const { plants, loading } = useGetPlants({ id: plantId })
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')
    const [alertSeverity, setAlertSeverity] = useState(null)
    const userId = useSelector(state => state.user.id)


    // add plant to user and local nursery
    const addHandler = async () => {
        const result = await dispatch(addToNursery(plants)) //add to store nursery

        // add to user's nursery if logged
        if (userId) {
            const added = await addToUserNursery({ userId: userId, plantId: plantId })
            setAlertSeverity(!added ? 'error' : null)

            if (!added) {
                setMessage('Error while adding the plant to your personal database')
                setTimeout(() => { setAlertSeverity(null) }, 5000)
            }
        }

        if (alertSeverity != 'error') {
            setAlertSeverity(result.ok ? 'success' : 'info')
            setMessage(result.message)
            setTimeout(() => { setAlertSeverity(null) }, 5000)
        }
    }


    return (
        <>
            <AutoAlert severity={alertSeverity} message={message} close={setAlertSeverity} />

            <BlankSpace />

            {loading && <SpinnerRoundOutlined />}
            {!loading && (
                <>
                    <Plant plant={plants} onExit={() => navigate(-1) || navigate("/")} />
                    <button onClick={addHandler}>Add to Nursery</button>
                </>
            )}
        </>
    )
}

//<Plant plant={selectedPlant} onExit={() => navigate(-1)} />
export default PlantDetails