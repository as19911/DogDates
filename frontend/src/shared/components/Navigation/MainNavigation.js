import React from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";

import "./MainNavigation.css";

export default function MainNavigation() {
  return (
    <MainHeader>
      <h1 className="main-navigation__title">Dog Dates</h1>
      <nav className="main-navigation__header-nav">
        <NavLinks />
      </nav>
    </MainHeader>
  );
}
