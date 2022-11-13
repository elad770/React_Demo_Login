import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import ProtectedRoute from "./routing/ProtectedRoute";
import "./App.css";
import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";

function App() {
  const { loading } = useSelector((state) => state.user);
  return (
    <div>
      <Router>
        <Header />
        <main className="container content">
          <div className="contLogin">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route element={<ProtectedRoute />}>
                {!loading && (
                  <Route path="/profile" element={<ProfileScreen />} />
                )}
              </Route>
            </Routes>
            {loading && <Loader />}
          </div>
        </main>
      </Router>
    </div>
  );
}

export default App;
