import React from "react";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/LoginActions";
import { useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isLogged = useSelector((state) => state.user.username);

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
      <div>
        <NavLink to="/calendar">Calendar</NavLink>
      </div>
      <div>
        <NavLink to="/browse">Browse Plants</NavLink>
      </div>
      {isAdmin && (
        <div>
          <NavLink to="/admin">Admin</NavLink>
        </div>
      )}
      {isLogged && (
        <div>
          <button
            onClick={() => {
              dispatch(logOut());
            }}
          >
            Logout
          </button>
        </div>
      )}
            {!isLogged && (
        <div>
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
