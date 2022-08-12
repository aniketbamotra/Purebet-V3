import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import axios from "axios";
import Nav from "../components/Nav";
import "./index.scss";
import bgImg from "../images/Ellipse.png";
import AvailableBets from "../components/AvailableBets";
import Categories from "../components/Categories";

const index = () => {
  return (
    <main>
      <Nav />
      <img src={bgImg} className="bg-img"></img>
      <div className="landing-page">
        <div className="hero-logo-wrapper">
          <h1 className="hero-logo serif-800">Purebet.</h1>
          <h4 className="tagline sans">
            A next generation decentralized sports betting exchange.
          </h4>
        </div>
        <div className="btn-container">
          <button className="trans-btn sans">Explor Categories.</button>
          <button className="cta-btn sans">Launch Exchange.</button>
        </div>
      </div>
      <Categories />
      <div className="social-text">
        <h3 className="serif-600">
          Want to know more about <span>Purebet?</span>
        </h3>
        <p className="sans">
          Check out our <a>About Us</a> page. Follow us on{" "}
          <a href=""> Twitter</a> to stay updated and <br /> join our{" "}
          <a href="">Discord</a> to meet the community/ask questions!
        </p>
      </div>
    </main>
  );
};

export default index;
