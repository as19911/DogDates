import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

import Home from "./home/pages/Home";
import Login from "./login/pages/Login";
import Signup from './signup/pages/Signup';

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                image="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_28/1587661/dogs-age-years-kb-inline-200707.jpg"
                name="homePageDogsImage"
              />
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
