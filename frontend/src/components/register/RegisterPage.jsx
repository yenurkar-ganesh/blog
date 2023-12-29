import Header from "../header/header";
import { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const register = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3200/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setRegistrationStatus("Registration Successful");
      } else {
        const errorData = await response.json();
        setRegistrationStatus(errorData.msg || "Registration Failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistrationStatus("Network error. Please try again.");
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
        {registrationStatus && (
          <p
            className={
              registrationStatus.includes("Failed")
                ? "error-message"
                : "success-message"
            }
          >
            {registrationStatus}
          </p>
        )}
      </form>
    </main>
  );
};

export default RegisterPage;
