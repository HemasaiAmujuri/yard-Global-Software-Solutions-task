import React, { useState } from "react";
import "../styles/signUp.css";
import login from "./Login";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

const fetchData = async () => {
  try {
    const response = await fetch(`${hostUrl}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data);

    // ✅ SUCCESS CHECK
    if (response.ok) {
      alert("Signup successful");

      // 👉 redirect to login page
      navigate("/login");
    } else {
      alert(data.message || "Signup failed");
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

    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(userData);
    fetchData();
  };

  return (
    <div className="container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={userData.name}
          onChange={handleChange}
        />

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={userData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Signup</button>

         <p style={{ marginTop: "10px", textAlign: "center" }}>
        Already have an account?{""}
        <Link to="/login" style={{ color: "blue", textDecoration: "none" }}>
          Login
        </Link>
      </p>

      </form>

      
    </div>
  );
};

export default Signup;