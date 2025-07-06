import React, { useState } from "react";
import User from "./User";
import { useGetUsers } from "../hooks/useUsers";
import { SpinnerRoundOutlined } from "spinners-react";
import { deleteUsers, setAdmin } from "../hooks/useUsers";

const ManageUsers = () => {
    const [user, setUser] = useState(null)
    const [limit, setLimit] = useState("10")
    //const [users, setUsers] = useState([])
    //const [loading, setLoading] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [reloadFlag, setReloadFlag] = useState(false)
    const { users, loading } = useGetUsers({ limit: limit, reloadFlag: reloadFlag })

    /*
    useEffect(() => {
        console.log(selectedUsers)
        if (selectedUsers.length > 0) {
            console.log(selectedUsers[0].toString())
            console.log(selectedUsers[0])
        }
    }, [selectedUsers])
    */

    const handleCheck = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(prev => prev.filter(id => id != userId))
        } else {
            setSelectedUsers(prev => [...prev, userId])
        }
    }

    const handleSelectAll = () => {
        if (selectedUsers.length < users.length) {
            setSelectedUsers(users.map(usr => usr.id))
        } else {
            setSelectedUsers([])
        }
    }
    
    const handleDelete = async () => {
        const deletion =  await deleteUsers({ids: selectedUsers})

        if (deletion == 'success') {
            alert("users deleted")
        } else {
            alert(deletion)
        }
        setReloadFlag(reloadFlag => !reloadFlag)
    }

    const handleAdmin = async () => {
        const action = await setAdmin({ids: selectedUsers})

                if (action == 'success') {
            alert("User's permissions changed")
        } else {
            alert(action)
        }
        setReloadFlag(reloadFlag => !reloadFlag)
    }

    return (
        <>
            {loading ? (
                <SpinnerRoundOutlined />
            ) : (
                <>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}>id</th>
                            <th style={{ width: "20%" }}>Name</th>
                            <th style={{ width: "40%" }}>email</th>
                            <th style={{ width: "10%" }}>Admin</th>
                            <th style={{ width: "10%" }}>

                                <input id="select-all" style={{display:"inline"}} type="checkbox" checked={selectedUsers.length == users.length} onChange={() => handleSelectAll()} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td onClick={() => setUser(user)}>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? '✅' : '❌'}</td>
                                <td>
                                    <input name={`select${user.id}`} type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleCheck(user.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => setLimit(prev => (Number(prev) + 20).toString())}>Load More</button>
                <button onClick={() => handleDelete()}>Delete</button>
                <button onClick={() => handleAdmin()}>Set Admin</button>
                </>
            )}
            <>
                {user ? (
                    <User username={user.username} email={user.email} password={user.password} id={user.id} />
                ) : (
                    null)}
            </>
        </>
    )
}

export default ManageUsers