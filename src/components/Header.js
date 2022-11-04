import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserDetails } from "../features/user/userActions";
import { logout } from "../features/user/userSlice";
import "../styles/header.css";

const Header = () => {
  const { userInfo, userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  return (
    <header>
      <div className="header-status">
        <span>
          {userInfo
            ? `Logged opi in as ${userInfo.email}`
            : "You're not logged in"}
        </span>
        <div className="cta">
          {userInfo ? (
            <button className="button" onClick={() => dispatch(logout())}>
              Logout
            </button>
          ) : (
            <NavLink className="button" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
      <nav className="container navigation">
        <NavLink to="/">Home</NavLink>
        {!userInfo && <NavLink to="/login">Login</NavLink>}
        {!userToken && <NavLink to="/register">Register</NavLink>}
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </header>
  );
};

export default Header;
