import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav-left">
        <Link to="/" className="nav-left link-logo">
          Home
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/scorepanel">Score Panel</Link>
      </div>
    </div>
  );
};

export default Nav;
