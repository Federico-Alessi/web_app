import React, { useState } from "react";
import LoginComponent from "../Components/LoginComponent";
import CreateAccount from "../Components/CreateAccount";

const Login = () => {
    const [isNew, setIsNew] = useState(false)

    function handleNewUser() {
        isNew ? setIsNew(false) : setIsNew(true)
    }

    return (
        <>
        {isNew ? (
            <>
            <CreateAccount/>
            <p>Already have an account? <a href="#" onClick={() => handleNewUser()}>Login</a></p>
            </>
        ) : (
            <>
            <LoginComponent />
            <p>New user? <a href="#" onClick={() => handleNewUser()}>Create an account</a></p>
            </>
        )}
        </>
    )
}

export default Login