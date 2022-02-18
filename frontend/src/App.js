import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

function App() {
  return (
    <Router>
      <MainNavigation />
    </Router>
  );
}

export default App;
