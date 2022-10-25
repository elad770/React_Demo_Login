import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import ProtectedRoute from "./routing/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main className="container content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from "./components/Login";
// import Profile from "./components/Profile";
// import Header from "./components/Header";
// import useToken from "./components/useToken";
// import "./App.css";

// function App() {
//   const { token, removeToken, setToken } = useToken();

//   return (
//     <BrowserRouter>
//       <div className="App">
//         {token ? <Header token={removeToken} /> : <p></p>}
//         {!token && token !== "" && token !== undefined ? (
//           <Login setToken={setToken} />
//         ) : (
//           <>
//             <Routes>
//               <Route
//                 exact
//                 path="/profile"
//                 element={
//                   <Profile
//                     token={token}
//                     setToken={setToken}
//                     remove={removeToken}
//                   />
//                 }
//               ></Route>
//             </Routes>
//           </>
//         )}
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
