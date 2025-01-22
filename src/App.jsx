import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import { Navigate, useLocation } from 'react-router-dom'; // Navigate va useLocation import qilish
import { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation(); // Sahifa URL manzilini olish

  useEffect(() => {
    // localStorage'dan tokenni tekshirish
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Token mavjud bo‘lsa, autentifikatsiya holatini o‘zgartirish
    }
  }, []);

  return (
    <> 
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route
          path="/home"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/" state={{ from: location }} />
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
