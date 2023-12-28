import { FaBlog } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/" className="logo">
        <h1>
          <FaBlog /> Blog
        </h1>
      </Link>
      <nav>
        <Link to="/login">LogIn</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
