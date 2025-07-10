export async function deleteUsers({ ids }) {

    try {
        for (const id of ids) {
            const response = await fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                console.log(response)
                return 'failed to delete the user'
            }
        }

        return 'success'

    } catch {
        return 'failed to connect to database'
    }
}


export async function setAdmin({ ids }) {

    if (ids.length == 0) return 'No users selected'
    try {
        for (const id of ids) {
            const query = await fetch(`http://localhost:5000/users/${id}`)
            const user = await query.json()
            const value = !user.isAdmin
            const response = await fetch(`http://localhost:5000/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isAdmin: value })
            })

            if (!response.ok) {
                return 'failed to update the user role'
            }
        }

        return 'success'

    } catch {
        return 'failed to connect to database'
    }
}


export async function userSignUp({ user }) {
    const { username } = user
    let loginFlag = false
    let message = ''

    try {
        const response = await fetch(`http://localhost:5000/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            //dispatch(LogIn(email, password))
            message = `Welcome ${username}!`
            loginFlag = true
        }

    } catch {
        message = 'An error occurred while connecting to the database'
    }
    return { loginFlag, message }
}


export async function verifyLoggedUser({ username, rawPassword }) {

    try {
        const password = rawPassword.replace(/[^a-zA-Z0-9]/g, '')
        const response = await fetch(`http://localhost:5000/users?username=${username}&password=${password}`)
        const data = await response.json()
        console.log(data)

        if (data.length > 0) {
            return true

        } else {
            return false
        }

    } catch {
        return false
    }
}


export async function addToUserNursery({ userId, plantId }) {

    try {
        const currentState = await fetch(`http://localhost:5000/users/${userId}`)
        const user = await currentState.json()
        const currentNursery = await user.nursery

        if (!currentNursery.includes(plantId)) {
            const updatedNursery = [...currentNursery, plantId]
            const response = await fetch(`http://localhost:5000/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nursery: updatedNursery })
            })

            if (!response.ok) return false
        }

    } catch {
        return false
    }

    return true
}


export async function removeFromUserNursery({ userId, plantId }) {

    try {
        const currentState = await fetch(`http://localhost:5000/users/${userId}`)
        const user = await currentState.json()
        const currentNursery = await user.nursery

        if (currentNursery.includes(plantId)) {
            const updatedNursery = (currentNursery.filter(id => id != plantId)) || []
            const response = await fetch(`http://localhost:5000/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nursery: updatedNursery })
            })

            if (!response.ok) return false
        }

    } catch {
        return false
    }

    return true
}