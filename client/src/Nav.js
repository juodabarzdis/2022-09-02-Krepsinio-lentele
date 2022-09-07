import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/scorepanel">Score Panel</Link>
    </div>
  );
};

export default Nav;
