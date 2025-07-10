const initialState = {
    id: null,
    isAdmin: false,
    username: null,
    email: null,
    nursery: []
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {

        case "LOGOUT":
            return {
                ...state,
                id: '',
                isAdmin: false,
                username: null,
                email: null,
                nursery: []
            }

        case "LOGIN":
            return {
                ...state,
                id: action.payload.id,
                isAdmin: action.payload.isAdmin,
                username: action.payload.username,
                email: action.payload.email,
                nursery: action.payload.nursery
            }

        case "REMOVE":
            return {
                ...state,
                nursery: state.nursery.filter(plantId => plantId != action.payload.id)
            }

        case "REMOVE-ID":
            return {
                ...state,
                nursery: state.nursery.filter(plantId => plantId != action.payload)
            }

        case "ADD":
            return {
                ...state,
                nursery: [...state.nursery, action.payload.id],
            }

        default:
            return state;
    }
}

export default LoginReducer;