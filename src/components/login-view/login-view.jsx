import { useState } from "react";

export const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // this prevents the default behaviour of the form which is to reload the entire page
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      access: username,
      secret: password,
    };
    fetch("api login link here", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
