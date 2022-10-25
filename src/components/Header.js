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
      console.log("yyyyyyy");
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  return (
    <header>
      <div className="header-status">
        <span>
          {userInfo ? `Logged in as ${userInfo.email}` : "You're not logged in"}
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
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </header>
  );
};

export default Header;

// import logo from "../logo.svg";
// import axios from "axios";
// //import { useNavigate } from "react-router-dom";

// function Header(props) {
//   //const navigate = useNavigate();
//   function logMeOut() {
//     axios({
//       method: "POST",
//       url: "/logout",
//     })
//       .then((response) => {
//         props.token();
//         //navigate(-1);
//       })
//       .catch((error) => {
//         if (error.response) {
//           console.log(error.response);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         }
//       });
//   }

//   return (
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <button onClick={logMeOut}>Logout</button>
//     </header>
//   );
// }

// export default Header;
