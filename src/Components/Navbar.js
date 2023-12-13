import React, { useState } from "react";
import logo from "../images/logo.png";
import axios from "axios";
import { Link } from "react-router-dom";


function Navbar() {
  const [marketStatus, setMarketStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const getStatus = () => {
    axios
      .get(
        "https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=AT3K9VXSP5DN15HZ"
      )
      .then((response) => {
        setMarketStatus(response.data["MarketStatus"]);
        setShowPopup(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          <img src={logo} height="35" alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto mx-3">
            <li className="nav-item active ">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active ">
              <a className="nav-link" href="#">
                Forex <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active ">
              <a className="nav-link" href="#">
                Crypto <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active ">
              <a className="nav-link" href="#">
                Commodities <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item active ">
              <a className="nav-link" href="#">
                News <span className="sr-only"></span>
              </a>
            </li>
          </ul>
          
          <a
            href="#"
            className="btn btn-primary btn-lg active mx-3"
            role="button"
            aria-pressed="true"
          >
            Global Market Status
          </a>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
