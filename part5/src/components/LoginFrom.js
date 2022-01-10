import React, { useState } from "react";

const LoginForm = ({ handlelogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const login = (event) => {
    event.preventDefault();
    handlelogin({
      username: username,
      password: password,
    });
    setUsername("");
    setPassword("");
  };
  return (
    <form onSubmit={login}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="text"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
