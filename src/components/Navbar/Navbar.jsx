import "./Navbar.css";

import Logo from "../../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id="nav">
      <div className="logo">
        <Link to={"/"}>
          <img src={Logo} alt="logo do site Lash Designer" title="Logo" />
        </Link>
      </div>
      <div className="links">
        <ul className="nav-links">
          <li>
            <NavLink to={"/services"}>Serviços</NavLink>
          </li>
          <li>
            <NavLink to={"/scheduling"}>Agendamentos</NavLink>
          </li>
          <li>
            <NavLink to={"/services"}>Planos</NavLink>
          </li>
          <li>
            <NavLink to={"#contato"}>Contato</NavLink>
          </li>
        </ul>
        <button className="btn">
          <NavLink to={"/login"}>Login</NavLink>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
