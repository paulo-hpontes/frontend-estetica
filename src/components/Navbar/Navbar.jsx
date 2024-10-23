import "./Navbar.css";

import Logo from "../../assets/Logo.png";

// React Hooks
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Custom Hooks
import { useAuth } from "../../hooks/useAuth";

// Redux
import { logout, reset } from "../../slices/authSlice";

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

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
          {auth ? (
            <li>
              <NavLink to={"/scheduling"}>Meus Agendamentos</NavLink>
            </li>
          ) : (
            <li>
              <NavLink to={"/scheduling"}>Agendamentos</NavLink>
            </li>
          )}
          <li>
            <NavLink to={"/services"}>Planos</NavLink>
          </li>
          <li>
            <NavLink to={"#contato"}>Contatos</NavLink>
          </li>
        </ul>
        {auth ? (
          <button className="btn" onClick={handleLogout}>
            <NavLink to={'/'}>Logout</NavLink>
          </button>
        ) : (
          <button className="btn">
            <NavLink to={"/login"}>Login</NavLink>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
