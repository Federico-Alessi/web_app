import { useEffect, useState } from "react";

export function useGetUsers({ limit = "20", reloadFlag = false }) {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])


    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        //DELETE BEFORE DEPLOY
        let timeout

        const fetchUsers = async () => {
            setLoading(true)

            try {
                const response = await fetch(`http://localhost:5000/users?_limit=${limit}`, { signal })
                const result = await response.json()
                if (response.ok) setUsers(result)

            } catch (e) {
                if (e.name != 'AbortError') {
                    alert("An error occurred while connecting to the database")
                }

            } finally {
                //DELETE TIMEOUT BEFORE DEPLOY
                timeout = setTimeout(() => { setLoading(false) }, 700);
            }
        }

        fetchUsers()

        return () => {
            clearTimeout(timeout) //DELETE BEFORE DEPLOY
            controller.abort()
        }
    }, [limit, reloadFlag])


    return { users, loading }
}