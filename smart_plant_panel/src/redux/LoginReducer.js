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
                isAdmin: false,
                username: null
            }
        case "LOGIN":
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