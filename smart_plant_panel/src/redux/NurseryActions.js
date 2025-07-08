export const addToNursery = (plant) => {
    return async (dispatch, getState) => {
        const nursery = getState().nursery.plants

        if (!nursery.includes(plant)) {
            dispatch({type:"ADD", payload: plant})
            return {ok: true, message: 'Plant added to nursery'}
        } else {
            return { ok: false, message: 'Plant already in nursery'}
        }
    }
    //{ type: "ADD", payload: id }
}

export const removeFromNursery = (plant) => {
    return { type: "REMOVE", payload: plant }
}