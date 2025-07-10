const initialState = { plants: [] }

const NurseryReducer = (state = initialState, action) => {
    switch (action.type) {

        case "ADD":
            return {
                ...state,
                plants: [...state.plants, action.payload]
            }

        case "REMOVE":
            return {
                ...state,
                plants: state.plants.filter(id => id != action.payload)
            }

        case "EMPTY":
            return {
                ...state,
                plants: []
            }

        case "LOGIN":
            return {
                ...state,
                plants: []
            }

        default:
            return state;
    }
}

export default NurseryReducer