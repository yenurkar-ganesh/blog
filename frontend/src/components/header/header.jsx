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
          <FaBlog style={{color: '#ffa351'}} />
        </h1>
      </Link>

      <nav>
        {username && (
          <>
            <div className="postLogout">
              <Link
                className="publishBtn"
                style={{ padding: "7px 20px", borderRadius: "5px", display: 'flex' }}
                to="/create"
              >
                Create
              </Link>
              <Link
                className="publishBtn"
                style={{ padding: "7px 20%", borderRadius: "5px" }}
                onClick={logout}
              >
                Logout
              </Link>
            </div>
          </>
        )}
        {!username && (
          <>
            <Link className="publishBtn" to="/login">
              LogIn
            </Link>
            <Link className="publishBtn" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
