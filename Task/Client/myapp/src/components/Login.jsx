import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import signUp from "./Signup";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });


  const hostUrl = "http://localhost:5000";

  const navigate = useNavigate();


const fetchData = async () => {
  try {
    const response = await fetch(`${hostUrl}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data);

    // ✅ SUCCESS CONDITION (depends on backend response)
    if (response.ok) {
      alert("Login successful");

      // 👉 navigate to userlist page
      navigate("/userlist");
    } else {
      // ❌ backend sent error
      alert(data.message || "Login failed");
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Server error");
  }
};

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(userData);
    fetchData();
  };




  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={userData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={userData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>

         <p style={{ marginTop: "10px", textAlign: "center" }}>
        Don't have an account?{""}
        <Link to="/signUp" style={{ color: "blue", textDecoration: "none" }}>
          Sign up
        </Link>
      </p>
      </form>
    </div>
  );
};

export default Login;