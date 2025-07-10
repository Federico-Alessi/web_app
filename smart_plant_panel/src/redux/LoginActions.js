import { removeFromUserNursery } from "../api/usersApi"

export const logOut = () => {
    return (dispatch) => {
        dispatch({ type: "LOGOUT" })
        dispatch({ type: "EMPTY" })
    }
}

export const LogIn = (email, password) => {
    return async dispatch => {
        try {
            const request = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`)
            const data = await request.json()
            if (data.length > 0) {
                dispatch({ type: "LOGIN", payload: data[0] })
            } else {
                alert("Wrong credentials")
            }
        } catch {
            alert("email or username not valid")
        }

    }
}

export const removeIdFromUsrNursery = ({ plantId, userId }) => {
    removeFromUserNursery({ plantId: plantId, userId: userId })
    return { type: "REMOVE-ID", payload: plantId }
}