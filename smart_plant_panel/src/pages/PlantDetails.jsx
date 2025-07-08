import { useNavigate, useParams } from "react-router"
import Plant from "../Components/Plant"
import { useGetPlants } from "../hooks/usePlants"
import { SpinnerRoundOutlined } from "spinners-react"
import BlankSpace from "../Components/BlankSpace"
import { useDispatch } from "react-redux"
import { addToNursery } from "../redux/NurseryActions"
import { useState } from "react"
import Alert from "@mui/material/Alert"

const PlantDetails = () => {
    const navigate = useNavigate()
    const { plantId } = useParams()
    const { plants, loading } = useGetPlants({ id: plantId })
    const dispatch = useDispatch()
    const [flag, setFlag] = useState(false)

    const nurseryHandler = () => {
        dispatch(addToNursery(plants))
        setFlag(true)
        setTimeout(() => { setFlag(false) }, 5000)
    }

    return (
        <>
            {flag ? <Alert severity='success' onClose={() => { setFlag(false) }} id='alert'>Plant added to nursery</Alert> : null}
            <BlankSpace />
            {loading && <SpinnerRoundOutlined />}
            {!loading && (
                <>
                <Plant plant={plants} onExit={() => navigate(-1)||navigate("/browse")} />
                <button onClick={nurseryHandler}>Add to Nursery</button>
                </>
                )}
        </>
    )
}

//<Plant plant={selectedPlant} onExit={() => navigate(-1)} />
export default PlantDetails