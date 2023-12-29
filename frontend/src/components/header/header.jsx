import { useEffect, useState, useContext } from "react";
import { FaBlog } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../userContext.jsx";

const Header = () => {
  const { userInfo, setUserinfo } = useContext(UserContext);
  const navigate = useNavigate(); // Add this line for navigation
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:3200/profile", {
          credentials: "include",
        });

        if (response.ok) {
          const userInfo = await response.json();
          setUserinfo(userInfo);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, [setUserinfo]);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3200/logout", {
        credentials: "include",
        method: "POST",
      });

      if (response.ok) {
        setUserinfo(null);
        setRedirect(true);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        <h1>
          <FaBlog /> Blog
        </h1>
      </Link>

      <nav>
        {username && (
          <>
            <div className="postLogout">
              <Link className="newPost"  to="/create">
                New Post
              </Link>
              <button onClick={logout}>Logout</button>
            </div>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">LogIn</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
