import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import { Navigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
// import User from './Pages/User/User';
import Register from './Pages/Registor/Registor';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Agar token bo'lsa, foydalanuvchini autentifikatsiya qilgan deb belgilash
    }
  }, []);

  return (
    <> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        {/* <Route path='/user' element={isAuthenticated ? <User/> : <Navigate to={"/"}/>}/> */}
        <Route path='/registor' element={<Register/>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
