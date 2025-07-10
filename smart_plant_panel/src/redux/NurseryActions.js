export const addToNursery = (plant) => {
    return async (dispatch, getState) => {
        const nursery = getState().nursery.plants

        if (!nursery.some(p => p.id == plant.id)) {
            dispatch({ type: "ADD", payload: plant })
            return { ok: true, message: 'Plant added to nursery' }
        } else {
            return { ok: false, message: 'Plant already in nursery' }
        }
    }
    //{ type: "ADD", payload: id }
}

export const removeFromNursery = (plant) => {
    return (dispatch) => {
        dispatch({ type: "REMOVE", payload: plant })
    }
}

export const emptyNursery = () => {
    return { type: "EMPTY" }
}