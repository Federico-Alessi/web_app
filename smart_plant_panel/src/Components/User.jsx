import React, { useState } from "react";

const User = ({ username, email, password, id }) => {
    const [showPassword, setShowPassword] = useState(false)
    const date = new Date(Number(id)).toLocaleDateString();

    function showPassHandler() {
        showPassword ? setShowPassword(false) : setShowPassword(true)
        console.log(id)
    }

    return (
        <>
            <h1>{username}</h1>
            <p><b>email: </b>{email}</p>
            <p onClick={() => showPassHandler()} style={{ cursor: "pointer" }}><b>password: </b>{showPassword ? password : "***"}</p>
            <p><b>Date of subscription: </b>{date}</p>
        </>
    )
}

export default User