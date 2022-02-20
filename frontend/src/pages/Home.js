import React from "react";

import "./Home.css";

export default function Home(props) {
  return (
    <div className="home-page">
      <div className="home-page__content">
        <h1>Dog Dates </h1>
        <div className="home-page__introduction">
          Want to find a play date for your dog?
          <br></br>
          Dog dates is the best way to find sogs in your area that are looking
          for friends just like you!
        </div>
        <div className="home-page__image">
          <img src={props.image} alt={props.name} />
        </div>
      </div>
    </div>
  );
}
