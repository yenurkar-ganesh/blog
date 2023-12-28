import Header from "../header/header";
import { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3200/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert(`Registration Successful`);
    } else {
      alert(`Registration Failed!`);
    }
  };

  return (
    <main>
      <Header />
      <form onSubmit={register} className="register">
        <h1>Register Now</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </main>
  );
};

export default RegisterPage;
