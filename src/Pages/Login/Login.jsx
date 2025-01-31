import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [parol, setParol] = useState("");
  const navigate = useNavigate();

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
        if (element?.success) {
          toast.success("Siz royhatdan otingiz");

          localStorage.setItem(
            "token",
            element?.data?.tokens?.accessToken?.token
          );

          navigate("/home");
        } else {
          toast.error("Siz royhatdan o'ta olmadingiz, qayta urunib ko'ring!");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div className="form-container">
        <meta name="description" content="Biz haqimizda ma'lumot oling" />
        <meta name="Login" content="Login xaqida malumot oling" />

        <div className="form-text">
          <h1>Login</h1>

          <div className="img">
            <img
              src="https://thumbs.dreamstime.com/b/login-icon-button-vector-illustration-isolated-white-background-126999474.jpg"
              alt=""
            />
          </div>
        </div>

        <form onSubmit={loginSubmit}>
          <input
            onChange={(e) => setParol(e.target.value)}
            value={parol.toLocaleLowerCase()}
            type="text"
            placeholder="Name"
            required
            minLength={3}
          />
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            type="password"
            placeholder="password"
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
