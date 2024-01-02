import Header from "../header/header";
import { useState } from "react";
import { FaBlog } from "react-icons/fa6";

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
      <div className="signUpForm">
        <div className="signUpLogo">
          <p className="welcome">
            <h2>Welcome, 👋</h2>To <FaBlog style={{'height': '20px', width : '20px', marginLeft: '10px' }} />
          </p>
          <h1 className="signUp">Sign Up</h1>
          <p className="orLogin">
            Or
            <p>
              <a className="loginLink" href="/login">
                LogIn To Your Account
              </a>
            </p>
          </p>
        </div>
        <div className="separateLine"></div>
        <form onSubmit={register} className="register">
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
      </div>
    </main>
  );
};

export default RegisterPage;
