import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // to display error messages

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    if (!username || !password) {
      setError("both fields are required");
    }

    const data = {
      access: username,
      secret: password,
    };

    fetch("https://movieflix-application-717006838e7d.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        localStorage.setItem("authToken", data.token); // Store the token in localStorage
        onLoggedIn(username); // Call the callback to update UI after successful login
      })
      .catch((error) => {
        setError(error.message); // Set error if login fails
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      Login
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
