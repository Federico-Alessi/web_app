
export const logOut = () => {
    return {type: "LOGOUT"}
}

export const LogIn = (email, password) => {
    return async dispatch => {
        try{
            const request = await fetch(`http://localhost:5000/users?email=${email}&&password=${password}`)
            const data = await request.json()
            if (data.length > 0) {
                dispatch({type: "LOGIN", payload: data[0]})
                alert("logged in")
            } else {
                alert("ouch")
            }


        } catch {
            alert("email or username not valid")
        }

    }
}