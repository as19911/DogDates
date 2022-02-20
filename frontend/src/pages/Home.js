import React from "react";

import "./Home.css";

export default function Home(props) {
  return (
    <div className="home-page">
      <div className="home-page__content">
        <div className="home-page__image">
          <img src={props.image} alt={props.name} />
        </div>
      </div>
    </div>
  );
}
