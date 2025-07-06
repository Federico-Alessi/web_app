const initialState = {plants:[]}

const NurseryReducer = (state=initialState, action) => {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                plants: [...state.plants, action.payload]
            }
        case "REMOVE":
            return {
                ...state,
                plants: [...state.plants.filter(id => id != action.payload)]
            }
        default:
            return state;
    }
}

export default NurseryReducer