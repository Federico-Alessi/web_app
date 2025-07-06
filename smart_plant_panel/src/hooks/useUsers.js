import { useEffect, useState } from "react";

export function useGetUsers({ limit = "20", reloadFlag=false }) {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {

        const fetchUsers = async () => {
            setLoading(true)
            try {
                const response = await fetch(`http://localhost:5000/users?_limit=${limit}`)
                const result = await response.json()
                if (response.ok) setUsers(result)
            } catch {
                alert("An error occurred while connecting to the database")
            } finally {
                setTimeout(() => { setLoading(false) }, 700);
            }
        }

        fetchUsers()
    }, [limit, reloadFlag])
    return { users, loading }
}

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

export async function setAdmin({ids}) {
    if (ids.length == 0) return 'No users selected'
    try {
        for (const id of ids) {
            const query = await fetch(`http://localhost:5000/users/${id}`)
            const user = await query.json()
            const value = !user.isAdmin
            const response = await fetch(`http://localhost:5000/users/${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({isAdmin: value})
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