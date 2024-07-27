import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
          path="/"
        />
        <Route
          element={authUser ? <Navigate to={"/"} /> : <Login />}
          path="/login"
        />
        <Route
          element={authUser ? <Navigate to={"/"} /> : <SignUp />}
          path="/signup"
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
