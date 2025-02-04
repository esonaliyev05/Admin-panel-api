import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Register from "./Pages/Registor/Registor";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") // Token mavjud bo‘lsa, `true` qilib olamiz
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [localStorage.getItem("token")]); // Token o‘zgarsa, `useEffect` qayta ishlaydi

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route path="/registor" element={<Register />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
