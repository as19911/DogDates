import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Home
          image="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_28/1587661/dogs-age-years-kb-inline-200707.jpg"
          name="homePageDogsImage"
        />
      </main>
    </Router>
  );
}

export default App;
