import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import AddPlant from '../Components/AddPlant';
import EditPlants from '../Components/EditPlants';
import ManageUsers from '../Components/ManageUsers';
import ManagePlants from '../Components/ManagePlants';


const AdminDashboard = () => {
    const isAdmin = useSelector((state) => state.user.isAdmin);
    const [adminAction, setAdminAction] = useState("");

    const handleDropdownChange = (e) => {
        setAdminAction(e.target.value);
    }

    if (!isAdmin) {
        return (
            <div>
                <h1>Access Denied</h1>
                <p>You do not have permission to access this page.</p>
                <button onClick={() => window.location.href = "/"}>Return to home</button>
            </div>
        );
    }
    return (
        <div>
            <h1>Admin dashboard</h1>
            <div>
                <select onChange={handleDropdownChange} defaultValue="">
                    <option value="" disabled>Choose an operation</option>
                    <option value="addPlant"> Add a new plant</option>
                    <option value="managePlants">Manage plants</option>
                    <option value="manageUsers">Manage users</option>
                </select>
                <p></p>
                { adminAction == "addPlant" && <AddPlant />}
                { adminAction == "managePlants" && <ManagePlants/>}
                { adminAction == "manageUsers" && <ManageUsers/>}
            </div>
        </div>
    );
};

export default AdminDashboard;