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