import '../styles/Navbar.css'
import axios from "axios";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, toggleAuth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/api/me")
      .then((res) => res.data)
      .then((cookieUser) => {
        if (cookieUser.id) {
          toggleAuth(cookieUser);
          navigate("/home");
        }
      })
      .catch((err) => {
        if ((err.response.status = 401)) navigate("/login");
      });
  }, []);

  const handleLogOut = () => {
    axios.get("/api/logout").then(() => {
      toggleAuth(null);
      navigate("/login");
    });
  };

  if (isAuthenticated)
    return (
      <header>
        <Link to="/home">
          <img className='logo' src={process.env.PUBLIC_URL + "/pikachu.png"} alt='logo' />
        </Link>
        <nav>
          <ul className='nav__links'>
            <li>Welcome {user.username.slice(0, 1).toUpperCase()}{user.username.slice(1)}</li>
          </ul>
        </nav>
        <Link to={`/users/${user.id}/favorites`}>
          <button className='cta'>Favorites</button>
        </Link>
        <Link to="/search">
          <button className='cta'>Search</button>
        </Link>
        <Link to="/login">
          <button className='cta' onClick={handleLogOut}>Log out</button>
        </Link>
      </header>
    );
  return (
    <header id="loginHeader">
      <Link to="/login">
        <img className='logo' src={process.env.PUBLIC_URL + "/pikachu.png"} alt='logo' />
      </Link>
      <h1 id="titleNavbar">Maxi Movie Data Base</h1>
    </header>
  );
};

export default Navbar;
