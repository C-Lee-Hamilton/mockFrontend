import React, { useState } from "react";
import "./App.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

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
  const [email, setEmail] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [changePw, setChangePw] = useState("");
  const [oldPw, setOldPw] = useState("");
  const [message, setMessage] = useState("");

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const handleLogin = async () => {
    try {
      const rresponse = await axios.post("/Auth/login", {
        username: username,
        password: password,
        email: emailLogin,
        token: token,
      });

      if (rresponse.data.success) {
        console.log("you win");
        console.log(rresponse.data.user);
        setArraytest(rresponse.data.user.interests);
        setToken(rresponse.data.token);
      } else {
        // Login failed
        console.log("Login failed:", rresponse.data.message);

        // Display an error message to the user or update the UI accordingly
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Display an error message to the user or update the UI accordingly
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
      const response = await axios.post("/Users/register", {
        email: email,
        password: newPassword,
        username: newUsername,
      });
      console.log(response.data.user);

      // You can show a success message or redirect the user to the login page after successful registration.
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.post("/Auth/change-password", {
        oldPassword: oldPw,
        newPassword: changePw,
      });

      if (response.data.success) {
        setMessage("Password changed successfully.");
        // Clear the input fields
        setOldPw("");
        setChangePw("");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Password change error:", error);
      setMessage("An error occurred while changing the password.");
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
        type="text"
        placeholder="email"
        value={emailLogin}
        onChange={(e) => setEmailLogin(e.target.value)}
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
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleEditInterests}>submit edit</button>
      <br></br>
      <button onClick={logout}>logout</button>
      <img src={image} alt="imagetester" />
      <br />
      <input
        type="password"
        placeholder="new password"
        value={changePw}
        onChange={(e) => setChangePw(e.target.value)}
      />
      <input
        type="password"
        placeholder="old password"
        value={oldPw}
        onChange={(e) => setOldPw(e.target.value)}
      />
      <button onClick={handlePasswordChange}>logout</button>
    </div>
  );
}

export default App;
