import React, { useState, useEffect } from "react";
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
  const [token, setToken] = useState(null);
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [newName, setNewName] = useState("");
  const [nameholder, setNameholder] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [interests, setInterests] = useState([]);
  const [user, setUser] = useState(null);

  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // const headers = {
  //   Authorization: `Bearer ${token}`,
  // };
  //refresh

  // useEffect(() => {
  //   // Check if user is logged in using localStorage
  //   const storedToken = localStorage.getItem("token");
  //   const storedUser = localStorage.getItem("user");

  //   if (storedToken && storedUser) {
  //     setToken(storedToken);
  //     setUser(JSON.parse(storedUser));

  //     // Set the token in axios headers
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
  //   }
  // }, []);

  const handleLogin = async () => {
    try {
      const rresponse = await axios.post("/Auth/login", {
        username: username,
        password: password,
        email: emailLogin,
        // token: token,
      });

      if (rresponse.data.success) {
        console.log("you win");
        console.log(rresponse.data.user);
        setArraytest(rresponse.data.user.interests[0]);
        setToken(rresponse.data.token);
        setTest("true");
        setProfileImage(rresponse.data.user.image);
        setNameholder(rresponse.data.user.username);
        setInterests(rresponse.data.user.interests);
        // setUser(rresponse.data.user);
        // localStorage.setItem("user", JSON.stringify(rresponse.data.user));
        // localStorage.setItem("token", rresponse.data.token);
        // localStorage.setItem("user", JSON.stringify(rresponse.data.user));
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

  const logout = async () => {
    try {
      await axios.post("/Auth/logout");
      console.log("sucess!");
      setArraytest("");
      setToken("");
      setTest("false");
      setProfileImage("");
      setImage("");
      setNameholder("");
      setUsername("");
      setEmailLogin("");
      setPassword("");
      setNewUsername("");
      setEmail("");
      setNewPassword("");
      setNewPw("");
      setOldPw("");
      setImage("");
      setNewName("");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("/Users/register", {
        email: email,
        password: newPassword,
        username: newUsername,
      });
      console.log(response.data.user);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.post("/Auth/change-password", {
        oldPassword: oldPw,
        newPassword: newPw,
      });

      if (response.data.success) {
        console.log("password changed");
      } else {
      }
    } catch (error) {
      console.error("Password change error:", error);
    }
  };

  //handle edit image change
  const addImage = async () => {
    axios
      .post("/Auth/update-userImage", { imageurl: image })
      .then((response) => {
        console.log(response.data.user);
        console.log("hello");
        setProfileImage(image);
        setImage(""); // Updated user object
      })
      .catch((error) => {
        console.log("hellooooo");

        console.log(token);

        console.error(error.response.data.user); // Error message from the server
      });
  };
  //handle add an interest
  const addInterest = async () => {
    try {
      const updatedInterests = [...interests, newInterest];

      await axios.post("/Auth/add-interests", { interests: updatedInterests });

      setInterests(updatedInterests); // Update the interests array in state
      localStorage.setItem("interests", JSON.stringify(updatedInterests)); //store to local
      setNewInterest(""); // Clear the input field
    } catch (error) {
      console.error("Error adding interest:", error);
    }
  };

  //handle username change

  const nameChange = async () => {
    axios
      .post("/Auth/update-userName", { username: newName })
      .then((response) => {
        console.log(response.data.user.username);

        // Updated user object
      })
      .catch((error) => {
        console.error(error.response.data.user); // Error message from the server
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
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
      <br></br>

      <br></br>

      <img src={profileImage} alt="imagetester" />

      <br />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button onClick={addImage}>Add Image</button>
      <br />
      <input
        type="text"
        placeholder="Add an interest"
        value={newInterest}
        onChange={(e) => setNewInterest(e.target.value)}
      />
      <button onClick={addInterest}>Add Interest</button>
      <br />
      <input
        type="text"
        placeholder={nameholder}
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={nameChange}>Change Username</button>

      <br />
      <input
        type="password"
        placeholder="new password"
        value={newPw}
        onChange={(e) => setNewPw(e.target.value)}
      />
      <input
        type="password"
        placeholder="old password"
        value={oldPw}
        onChange={(e) => setOldPw(e.target.value)}
      />
      <button onClick={handlePasswordChange}>change password</button>
      <br />
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default App;
