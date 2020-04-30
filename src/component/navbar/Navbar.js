import React from "react";
import "./Navbar.css";
//import Logo from '../img/logo.png';
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className = "header-wrapper">
      <div className = "main-header">
        <div className="nav-wrapper">
          <Link to='/'><img
            id="main-logo"
            src={require("../../img/YouHa_logo.png")}
            alt=""
          />
          </Link>
          <div id="project-name">YouHi</div>
          <NavLink
            to="/skill"
            className="App-Nav"
            activeStyle={{ color: "blue" }}
          >
            Skill
          </NavLink>
          <NavLink
            exact
            to="/"
            className="App-Nav"
            activeStyle={{ color: "blue" }}
          >
            HOME
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
