import Alert from "@mui/material/Alert";
import React from "react";

const AutoAlert = ({ severity, message, close }) => {
    const show = severity && message

    return (
        <>
            {show && <Alert severity={severity} onClose={() => close(null)} id='alert'>{message}</Alert>}
        </>
    )

}

export default AutoAlert