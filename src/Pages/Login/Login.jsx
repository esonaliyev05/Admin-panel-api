import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [parol, setParol] = useState("");
  const [loading, setLoading] = useState(false); // Loading holati
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();

    setLoading(true); // Loadingni yoqish

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
        setLoading(false); // Loadingni o'chirish
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
      .catch((error) => {
        setLoading(false); // Agar xato bo'lsa loadingni o'chirish
        console.error("Error:", error);
      });
  };

  return (
    <div className="form-container">
      {/* Video fon */}
      <video className="background-video" autoPlay loop muted>
        <source
          src="https://autozoomrental.com/static/video.webm"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="form-text">
        <h1>Login</h1>
        <div className="img">
          <img
            src="https://thumbs.dreamstime.com/b/login-icon-button-vector-illustration-isolated-white-background-126999474.jpg"
            alt=""
          />
        </div>
      </div>

      <form onSubmit={loginSubmit} className="form-login">
        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          type="tel" // phone uchun "tel" turi
          placeholder="Phone Number"
          required
        />
        <input
          onChange={(e) => setParol(e.target.value.toLocaleLowerCase())}
          value={parol}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"} {/* Loadingni ko'rsatish */}
        </button>
      </form>
    </div>
  );
};

export default Login;
