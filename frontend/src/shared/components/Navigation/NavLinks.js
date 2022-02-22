import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

export default function NavLinks() {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/login">Log In</NavLink>
      </li>
    </ul>
  );
}
