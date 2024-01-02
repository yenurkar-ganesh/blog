import { useContext, useState } from "react";
import Header from "../header/header";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../userContext";
import { FaBlog } from "react-icons/fa6";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserinfo } = useContext(UserContext);

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3200/login", {
        method: "POST", // Corrected method to "POST"
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        alert(`Login Successful`);
        response.json().then((userInfo) => {
          setUserinfo(userInfo);
          setRedirect(true);
        });
      } else {
        alert(`Login Failed!`);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <main>
      <Header />
      <form onSubmit={login} className="loginForm">
        <h1>
          LogIn to <FaBlog />{" "}
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit">LogIn</button>
      </form>
    </main>
  );
};

export default Login;
