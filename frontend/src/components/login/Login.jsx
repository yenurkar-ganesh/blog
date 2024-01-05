import { useContext, useState } from "react";
import Header from "../header/header";
import { Link, Navigate } from "react-router-dom";
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
    <>
      <Header />
      <main>
        <form onSubmit={login} className="loginForm">
          <h1 style={{ marginBottom: "2.8rem" }}>
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
          <button
            className="publishBtn"
            style={{ width: "100%", padding: "11px 0px" }}
            type="submit"
          >
            LogIn
          </button>

          <span
            style={{
              backgroundColor: "lightgray",
              height: "1px",
              width: "100%",
              marginTop: "3rem",
              marginBottom: "3rem",
              position: " relative",
            }}
          >
            <p
              style={{
                position: "absolute",
                backgroundColor: '#fff',
                padding: '2px 9px',
                top: '-0%',
                left: '50%',
                transform: "translate(-50%, -100%)",
                // bottom: 0,
                // right: 0,
                
              }}
            >
              OR
            </p>
          </span>
          <p>
            Don't have an Account?{" "}
            <Link
              to={"/register"}
              style={{ color: "#ffa351", textDecoration: "none" }}
              href="/register"
            >
              Register
            </Link>{" "}
          </p>
        </form>
      </main>
    </>
  );
};

export default Login;
