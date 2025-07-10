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

const PlantDetails = () => {
    const navigate = useNavigate()
    const { plantId } = useParams()
    const { plants, loading } = useGetPlants({ id: plantId })
    const dispatch = useDispatch()
    const [infoFlag, setInfoFlag] = useState(false)
    const [errorFlag, setErrorFlag] = useState(false)
    const [message, setMessage] = useState('')
    const userId = useSelector(state => state.user.id)


    // add plant to user and local nursery
    const addHandler = async () => {

        const result = await dispatch(addToNursery(plants))

        if (userId) {
            const userNursery = await addToUserNursery({ userId: userId, plantId: plantId })
            setErrorFlag(!userNursery)

            if (errorFlag) {
                setMessage('Error while adding the plant to your personal database')
                setTimeout(() => { setErrorFlag(false) }, 5000)
            }
        }

        if (!errorFlag) {
            setMessage(result.message)
            setInfoFlag(true)
            setTimeout(() => { setInfoFlag(false) }, 5000)
        }
    }


    return (
        <>
            {errorFlag && <Alert severity='error' onClose={() => { setErrorFlag(false) }} id='alert'>{message}</Alert>}
            {infoFlag && <Alert severity='info' onClose={() => { setInfoFlag(false) }} id='alert'>{message}</Alert>}

            <BlankSpace />

            {loading && <SpinnerRoundOutlined />}
            {!loading && (
                <>
                    <Plant plant={plants} onExit={() => navigate(-1) || navigate("/browse")} />
                    <button onClick={addHandler}>Add to Nursery</button>
                </>
            )}
        </>
    )
}

//<Plant plant={selectedPlant} onExit={() => navigate(-1)} />
export default PlantDetails