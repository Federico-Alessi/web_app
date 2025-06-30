const initialState = {
    isAdmin: false,
    username: null,
    email: null
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGOUT":
            return {
                ...state,
                isAdmin: state.isAdmin = false,
                username: null
            }
        case "LOGIN":
            console.log(action.payload)
            return {
                ...state,
                isAdmin: action.payload.isAdmin,
                username: action.payload.username,
                email: action.payload.email,
            }
        default:
            return state;
    }
}

export default LoginReducer;