import React from 'react';
import { useSelector } from 'react-redux';
import AddPlant from '../Components/AddPlant';


const AdminDashboard = () => {
    const isAdmin = useSelector((state) => state.user.isAdmin);

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
            <h1>admin dashboard</h1>
            <div>
                
                <AddPlant></AddPlant>
            </div>
        </div>
    );
};

export default AdminDashboard;