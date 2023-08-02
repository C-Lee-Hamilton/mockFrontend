// frontend/src/App.js
import React, { useState } from "react";
import "./App.css";
import axios from "axios";

// Set the base URL for Axios to point to your backend server
axios.defaults.baseURL = "http://localhost:5000"; // Replace with your actual backend URL

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [test, setTest] = useState("you need to log in");
  const [arraytest, setArraytest] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [interests, setInterests] = useState("");
  const [users, setUsers] = useState(null);
  const [token, setToken] = useState(null);
  const [image, setImage] = useState("");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", { username, password });
      console.log("Logged in user:", response.data.user);
      setTest("active");
      setToken(response.data.token);
      setArraytest(response.data.user.interests);
      setUsers(response.data.user);
      console.log(response.data.user.id);
      setImage(response.data.user.imageURL);
      console.log(response.data.user.imageURL);
      // You can redirect to the user's profile page or update the UI based on the logged-in state.
    } catch (error) {
      console.error("Login failed:", error);
      setTest("failed");
    }
  };
  const logout = () => {
    setUsers(null);
    setArraytest("log in");
    setInterests("");
    setTest("inactive");
    setImage("");
    setUsername("");
    setPassword("");

    delete axios.defaults.headers.common["Authorization"];
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("/register", {
        username: newUsername,
        password: newPassword,
      });
      console.log("Registered user:", response.data.user);
      // You can show a success message or redirect the user to the login page after successful registration.
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  const handleEditInterests = () => {
    // Send a PUT request to update the user's interests
    axios
      .put(`/users/${users.id}`, { interests })
      .then((response) => {
        // Update the user state with the new interests
        setUsers({ ...users, interests: interests });
        setInterests(""); // Clear the interests input field
        setArraytest(response.data.user.interests);
        console.log(response.data.user.interests);
        // Show a success message or update the UI to reflect the changes
      })
      .catch((error) => {
        console.error("Failed to update interests:", error);
        // Show an error message or handle the error
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <div>Logged in status:{test}</div>
      <div>pull information from array:{arraytest}</div>

      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
      <br></br>
      <input
        type="text"
        placeholder="interest"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
      />
      <button onClick={handleEditInterests}>submit edit</button>
      <br></br>
      <button onClick={logout}>logout</button>
      <img src={image} alt="imagetester" />
    </div>
  );
}

export default App;
