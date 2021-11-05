import React from "react";
import { IconSearch } from "../../assets";
import Map from "../../components/Map";
import "./index.css";

const Home: React.FC = () => {
  return (
    <>
      <Map />
      {/* <div className="left-wrapper">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Find Where Is"
          />
          <img className="search-icon" src={IconSearch} alt="search-where-is" />
        </div>
      </div>
      <div className="login-btn">Login</div> */}
    </>
  );
};

export default Home;
