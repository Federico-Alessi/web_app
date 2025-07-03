export const addToNursery = (id) => {
    return {type: "ADD", payload: id}
}

export const removeFromNursery = (id) => {
    return {type: "REMOVE", payload: id}
}