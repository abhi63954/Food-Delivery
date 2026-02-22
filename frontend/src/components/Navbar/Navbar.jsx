import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from "react-router-dom";


const Navbar = ({ setShowLogin }) => {

  const [menu, setmenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const { getTotalCartAmount, token, setToken, search, setSearch } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")

  }

  const handleHomeClick = () => {
    setmenu("home");
    setSearch("");
    setShowSearch(false);
  }

  return (
    <div className='navbar'>
      <Link to="/" onClick={handleHomeClick}><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={handleHomeClick} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setmenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setmenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setmenu("contact us")} className={menu === "contact us" ? "active" : ""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search">
          {showSearch && (
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="navbar-search-input"
            />
          )}
          <img
            src={assets.search_icon}
            alt="search"
            onClick={() => setShowSearch(!showSearch)}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="cart" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/myOrders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>}

      </div>
    </div>
  )
}

export default Navbar