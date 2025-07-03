import React from "react";
import { useState,  useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { LogIn } from "../redux/LoginActions";
import { useNavigate } from "react-router";

const LoginComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogged = useSelector((state) => state.user.username)
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    useEffect(()=> {
        if (isLogged) {
            navigate("/");
        }
    }, [isLogged, navigate])

    // Handle form submission
    function HandleSubmit(e) {
        e.preventDefault();

        let emailOk = false;
        let passwordOk = false;

        // Check email
        if (!email) {
            alert("Please enter a valid email address.");

        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert("Email address is invalid.");
            return

        } else {
            emailOk = true;
        }

        // Check password
        if (!password) {
            alert("Please enter a valid password.");
            return

        } else if (!/^[a-zA-Z0-9]+$/.test(password)) {
            alert("password is invalid.");
            return

        } else {
            passwordOk = true;
        }

        // dispatch actions
        if (passwordOk && emailOk) {
            dispatch(LogIn(email, password));
        } else {
            alert("Please enter a valid password and email address.");
        }


    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={HandleSubmit} id="login">
                <label>
                    email: <br/><input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                </label>
                <br/>
                <label>
                    password: <br/><input
                        type="text"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        required
                    />
                </label>
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginComponent;