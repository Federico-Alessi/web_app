const initialState = {
    isAdmin: false,
    username: null
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "admin/toggle":
            return {
                ...state,
                isAdmin: state.isAdmin=== false ? true : false
            }
        case "user/logout":
            return {
                ...state,
                isAdmin: state.isAdmin = false,
                username: null
            }
        case "user/setUser":
            return {
                ...state,
                username: action.payload
            }
        default:
            return state;
    }
}

export default LoginReducer;