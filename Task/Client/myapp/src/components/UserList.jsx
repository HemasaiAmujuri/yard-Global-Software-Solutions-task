import React, { useEffect, useState } from "react";
import "../styles/userList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // 🔥 Fetch users from API
  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();

      setUsers(data.users || []);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <h2>User List</h2>

      <div className="grid">
        {users.map((user, index) => (
          <div className="card" key={index}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;