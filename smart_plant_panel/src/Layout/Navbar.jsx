import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/LoginActions";
import { useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isLogged = useSelector((state) => state.user.username);

  const handleLogout = () => {
    dispatch(logOut());
  }

  return (
    <header>
      <div>
        <NavLink to="/" end>
          Home
        </NavLink>
      </div>
      <div>
        <NavLink to="/nursery">My Nursery</NavLink>
      </div>
      {isAdmin && (
        <div>
          <NavLink to="/admin">Admin</NavLink>
        </div>
      )}
      {isLogged && (
        <div>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      {!isLogged && (
        <div>
          <button onClick={() => { navigate("/login"); }}>
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
