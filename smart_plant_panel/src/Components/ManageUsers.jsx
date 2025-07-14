import React, { useState } from "react";
import User from "./User";
import { useGetUsers } from "../hooks/useUsers";
import { SpinnerRoundOutlined } from "spinners-react";
import { deleteUsers, setAdmin } from "../api/usersApi";
import BlankSpace from "./BlankSpace";
import { Form } from "react-router";

const ManageUsers = () => {
    const [displayUser, setDisplayUser] = useState(null)
    const [limit, setLimit] = useState("10")
    const [selectedUsers, setSelectedUsers] = useState([])
    const [reloadFlag, setReloadFlag] = useState(false)
    const { users, loading } = useGetUsers({ limit: limit, reloadFlag: reloadFlag })


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
        const deletion = await deleteUsers({ ids: selectedUsers })

        if (deletion == 'success') {
            alert("users deleted")
        } else {
            alert(deletion)
        }
        setSelectedUsers([])
        setReloadFlag(reloadFlag => !reloadFlag)
    }


    const handleAdmin = async () => {
        const action = await setAdmin({ ids: selectedUsers })

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

                                    <input id="select-all" style={{ display: "inline" }} type="checkbox" checked={selectedUsers.length == users.length} onChange={() => handleSelectAll()} />
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {users.map(user => (
                                <tr key={user.id}>
                                    <td onClick={() => setDisplayUser(user)} className="underlined-clickable">{user.id}</td>
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

                    <BlankSpace />
                    <button onClick={() => setLimit(prev => (Number(prev) + 20).toString())}>Load More</button>
                    <button onClick={() => handleDelete()}>Delete</button>
                    <button onClick={() => handleAdmin()}>Set Admin</button>
                </>
            )}

            <>
                {displayUser && (
                    <div className="display-overlay">
                        <User username={displayUser.username} email={displayUser.email} password={displayUser.password} id={displayUser.id} />
                        <button onClick={() => setDisplayUser(null)}>X</button>
                    </div>
                )}
            </>
        </>
    )
}

export default ManageUsers