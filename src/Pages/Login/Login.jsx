import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [parol, setParol] = useState("");
  const navigate = useNavigate(); // useNavigate hookini chaqirish

  const loginSubmit = (e) => {
    e.preventDefault();

    fetch("https://realauto.limsa.uz/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phone,
        password: parol,
      }),
    })
      .then((res) => res.json())
      .then((element) => {
        // Agar muvaffaqiyatli ro'yxatdan o'tsa
        if (element?.success) {
          toast.success("Siz royhatdan otingiz");
          
          // Tokenni saqlash
          localStorage.setItem("token", element?.data?.tokens?.accessToken?.token);

          // Foydalanuvchini home sahifasiga yo'naltirish
          navigate("/home"); // "/home" manziliga o'tish
        } else {
          toast.error("Siz royhatdan o'ta olmadingiz, qayta urunib ko'ring!");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={loginSubmit}>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="text"
            placeholder="Name"
            required
            minLength={3}
          />
          <input
            onChange={(e) => setParol(e.target.value)}
            value={parol}
            type="password"
            placeholder="Password"
            required
            minLength={3}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Login;
