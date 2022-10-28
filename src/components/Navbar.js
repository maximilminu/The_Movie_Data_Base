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
        <div className='welcome'>
          <Link to="/home">
            <img className='logo' src={process.env.PUBLIC_URL + "/pikachu.png"} alt='logo' />
          </Link>
          <nav>
            <ul className='nav__links'>
              <Link to="/home">
                <li>Welcome {user.username.slice(0, 1).toUpperCase()}{user.username.slice(1)}</li>
              </Link>
            </ul>
          </nav>
        </div>
        {/* <Link to={`/users/${user.id}/favorites`}>
          <h2>Favorites</h2>
        </Link> */}
        <Link to="/search">
          <h2>Search</h2>
        </Link>
        <Link to="/login">
          <h2 className='logout-button' onClick={handleLogOut}>Log out</h2>
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
