import React, { useState } from "react";

export const SignupView = ({ onSignedUp }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Email: email,
      Password: password,
      Birthday: birthday,
    };

    fetch("https://movieflix-application-717006838e7d.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Signup response:", data);

        // Check if signup was successful
        if (data.Username) {
          // If Username is returned, signup is successful
          setSignupSuccess(true);
          setError(null); // Clear any previous errors
        } else {
          setError("Signup failed: " + (data.message || "Unknown error"));
          setSignupSuccess(false);
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        setError("Signup failed: " + error.message);
        setSignupSuccess(false);
      });
  };

  return (
    <div>
      {signupSuccess ? (
        <div>
          <h3>Signup successful!</h3>
          <p>Please log in with your credentials.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Birthday:
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Sign Up</button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
