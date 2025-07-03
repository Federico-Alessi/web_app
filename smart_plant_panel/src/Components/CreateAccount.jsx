import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LogIn } from "../redux/LoginActions";

const CreateAccount = () => {
    const [user, setUser] = useState({
        id: "",
        username: "",
        email: "",
        password: "",
        isAdmin: false
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLogged = useSelector((state) => state.user.username)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        let emailOk = false
        let userNameOk = false
        let passwordOk = false

        // Check username
        if (!userName) {
            alert("Please enter a valid username")
        } else if (!/^[a-zA-Z0-9_]+$/.test(userName)) {
            alert("Username can contain only letters, numbers and underscores (_)")
        } else {
            userNameOk = true
        }

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

        if (userNameOk && passwordOk && emailOk) {
            setUser({...user,
                id: Date.now().toString(),
                username: userName,
                email: email,
                password: password
            })
            try {
                const response = await fetch(`http://localhost:5000/users`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(user)
                });
                if (response.ok)
                    dispatch(LogIn(email, password))
                    console.log(response)
            } catch (e) {
                alert("Something went wrong, please retry later")
                console.log(e)
                console.log(user)
            }
        }else console.log(userName +" "+ email +" "+ password)
    }

    useEffect(() => {
        if (isLogged) navigate("/")
    }, [isLogged, navigate])

    return (
        <div>
            <h1>Create account</h1>
            <form onSubmit={handleSubmit} id="login">
                <label>
                    username: <br /><input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    email: <br /><input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    password: <br /><input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default CreateAccount