export const toggleAdmin = () => {
    return {type: "admin/toggle"}
}

export const logOut = () => {
    return {type: "user/logout"}
}

export const setUser = (username) => {
    return {
        type: "user/setUser",
        payload: username
    }
}