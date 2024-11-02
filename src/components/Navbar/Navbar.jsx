import "./Navbar.css";

// React Hooks
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Custom Hooks
import { useAuth } from "../../hooks/useAuth";

// Redux
import { logout, reset } from "../../slices/authSlice";
import { resetUser } from "../../slices/userSlice";

const Navbar = () => {
  const { auth } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetUser());

    navigate("/login");
  };

  return (
    <nav id="nav">
      <div className="logo">
        <Link to={"/"}>
          <img src="Logo.png" alt="logo do site Lash Designer" title="Logo" />
        </Link>
      </div>
      {auth ? (
        <NavLink to={"/"}>
          <button className="btn" onClick={handleLogout}>Logout</button>
        </NavLink>
      ) : (
        <NavLink to={"/login"}>
          <button className="btn">Login</button>
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
