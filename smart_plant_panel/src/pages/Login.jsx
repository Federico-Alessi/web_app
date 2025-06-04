import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleAdmin, setUser } from "../redux/LoginActions";

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    // Handle form submission
    function HandleSubmit(e) {
        e.preventDefault();

        let emailOk = false;
        let usernameOk = false;
        let isAdmin = false;

        // Check email
        if (!email) {
            alert("Please enter a valid email address.");

        } else if (email === "admin@admin.com") {
            emailOk = true;
            isAdmin = true;
            
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert("Please enter a valid email address.");
            return

        } else {
            emailOk = true;
        }

        // Check username
        if (!username) {
            alert("Please enter a valid username.");
            return

        } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
            alert("Username is invalid.");
            return

        } else {
            usernameOk = true;
        }

        // dispatch actions
        if (usernameOk && emailOk && isAdmin) {
            dispatch(toggleAdmin());
            dispatch(setUser(username));
            alert("Login successful!");
            window.location.href = "/"
        } else if (usernameOk && emailOk && !isAdmin) {
            dispatch(setUser(username));
            alert("Login successful!");
            window.location.href = "/"
        } else {
            alert("Please enter a valid username and email address.");
        }


    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={HandleSubmit}>
                <label>
                    username: <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    email: <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;