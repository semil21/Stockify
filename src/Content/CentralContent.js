import React, { useState, useEffect } from "react";
import { AiFillUnlock } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";
import { BiLineChart } from "react-icons/bi";
import { BiLineChartDown } from "react-icons/bi";
import { TbArrowsExchange } from "react-icons/tb";
import { CgArrowsExchangeV } from "react-icons/cg";
import { FaCalendarDay } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import axios from "axios";

// OOBS5JVDDYBBTB62
// D9BESYAQ485OHR8E;

function StockPrice() {
  const [keyword, setKeyword] = useState("");
  const [symbol, setSymbol] = useState("");
  const [openPrice, setOpenPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [lowPrice, setLowPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [volume, setVolume] = useState("");
  const [previousClose, setPreviousClose] = useState("");
  const [change, setChange] = useState("");
  const [changePercent, setChangePercent] = useState("");
  const [latestTradingDay, setLatestTradingDay] = useState("");

  const [companyData, setCompanyData] = useState("");
  const [incomeStatement, setIncomeStatement] = useState("");

  // function getCompanyOverview() {
  //   // Replace "symbol" with the actual symbol entered by the user

  //   const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=AT3K9VXSP5DN15HZ`;

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => setCompanyData(data))
  //     .catch((error) => console.error(error));
  // }

  // function getIncomeStatement() {
  //   const url = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=AT3K9VXSP5DN15HZ`;

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => setIncomeStatement(data))
  //     .catch((error) => console.error(error));
  //   console.log(url);
  // }

  function searchStock() {
    const apiUrl = `  `;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.bestMatches && data.bestMatches.length > 0) {
          setSymbol(data.bestMatches[0]["1. symbol"]);
          getStockPrice(data.bestMatches[0]["1. symbol"]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=AT3K9VXSP5DN15HZ`;

    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => setCompanyData(data))
    //   .catch((error) => console.error(error));
  }

  function getStockPrice(symbol) {
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=AT3K9VXSP5DN15HZ`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data["Global Quote"]) {
          setOpenPrice(data["Global Quote"]["02. open"]);
          setHighPrice(data["Global Quote"]["03. high"]);
          setLowPrice(data["Global Quote"]["04. low"]);
          setCurrentPrice(data["Global Quote"]["05. price"]);
          setVolume(data["Global Quote"]["06. volume"]);
          setLatestTradingDay(data["Global Quote"]["07. latest trading day"]);
          setPreviousClose(data["Global Quote"]["08. previous close"]);
          setChange(data["Global Quote"]["09. change"]);
          setChangePercent(data["Global Quote"]["10. change percent"]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(apiUrl);
  }

  function downloadCSV() {
    if (symbol) {
      const csvUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=AT3K9VXSP5DN15HZ&datatype=csv`;
      const link = document.createElement("a");
      link.href = csvUrl;
      link.download = `${symbol}_weekly_adjusted.csv`;
      link.click();
    }
  }

  function companyOverview() {
    if (symbol) {
      const csvUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=AT3K9VXSP5DN15HZ&datatype=csv`;
      // const link = document.createElement("a");
      // link.href = csvUrl;
      // link.download = `${symbol}_weekly_adjusted.csv`;
      // link.click();
    }
  }

  function downloadCSVWeekly() {
    if (symbol) {
      const csvUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=AT3K9VXSP5DN15HZ&datatype=csv`;
      const link = document.createElement("a");
      link.href = csvUrl;
      link.download = `${symbol}_weekly_adjusted.csv`;
      link.click();
    }
  }
  function downloadCSVMonthly() {
    if (symbol) {
      const csvUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=AT3K9VXSP5DN15HZ&datatype=csv`;

      const link = document.createElement("a");
      link.href = csvUrl;
      link.download = `${symbol}_monthly_adjusted.csv`;
      link.click();
    }
  }

  return (
    <>
      <div className="container">
        <br />
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <form className="card card-sm">
              <div className="card-body row no-gutters align-items-center">
                <div className="col-auto">
                  <i className="fas fa-search h4 text-body"></i>
                </div>

                <div className="col">
                  <input
                    className="form-control form-control-lg form-control-borderless"
                    type="text"
                    placeholder="Search Company"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>

                <div className="col-auto">
                  <button
                    className="btn btn-lg btn-success"
                    type="submit"
                    onClick={searchStock}
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-sm-3 mr-sm-1 my-1">
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={downloadCSV}
            >
              Daily Report
            </button>
          </div>
          <div className="col-sm-3 mx-sm-1 my-1">
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={downloadCSVWeekly}
            >
              Weekly Report
            </button>
          </div>
          <div className="col-sm-3 ml-sm-1 my-1">
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={downloadCSVMonthly}
            >
              Monthly Report
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid"></div>
      <div className="grey-bg container-fluid">
        <section id="minimal-statistics">
          <div className="row">
            <div className="col-12 mt-3 mb-1">
              <div className="symbol-text">
                <h1>
                  {symbol} <span className="danger">{currentPrice}</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <span>Opened at - </span>
                        <br />
                        <h3 className="primary">₹ {openPrice} </h3>
                      </div>
                      <div className="align-self-center">
                        <i className=" primary font-large-2 float-right">
                          <AiFillUnlock />
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <span>High - </span>
                        <br />
                        <h3 className="warning">₹ {highPrice}</h3>
                      </div>
                      <div className="align-self-center">
                        <i className=" font-large-2 float-right">
                          <BiLineChart />
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <span> Change - </span>
                        <h3 className="success"> {change}</h3>
                      </div>
                      <div className="align-self-center">
                        <i className=" font-large-2 float-right">
                          <TbArrowsExchange />
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <span>Latest Trading Day </span>
                        <h3 className="danger">{latestTradingDay}</h3>
                      </div>
                      <div className="align-self-center">
                        <i className=" font-large-2 float-right">
                          <FaCalendarDay />
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="minimal-statistics">
          <div className="row">
            <div className="col-12 mt-3 mb-1">
              <p></p>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <span>Previous Close - </span>
                        <br />
                        <h3 className="primary"> ₹ {previousClose}</h3>
                      </div>
                      <div className="align-self-center">
                        <i className=" primary font-large-2 float-right">
                          <AiFillLock />
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <span> Low - </span>
                        <br />
                        <h3 className="warning"> ₹ {lowPrice} </h3>
                      </div>
                      <div className="align-self-center">
                        <i className=" font-large-2 float-right">
                          {" "}
                          <BiLineChartDown />
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <span> Change Percent - </span>
                        <h3 className="success"> {changePercent}</h3>
                      </div>
                      <div className="align-self-center">
                        <i className=" font-large-2 float-right">
                          <CgArrowsExchangeV />
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
              <div className="card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex">
                      <div className="media-body text-left">
                        <span> Volume- </span>

                        <h3 className="danger">{volume}</h3>
                      </div>
                      <div className="align-self-center">
                        <i className=" font-large-2 float-right">
                          <BsFillCartCheckFill />
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-2 p-0 mr-1">
            <button
              className="btn btn-secondary btn-block h-100"
              onClick={companyOverview}
              id="companyOverviewDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Company Overview
            </button>
            {companyData && (
              <div
                className="dropdown-menu"
                aria-labelledby="companyOverviewDropdown"
              >
                <a className="dropdown-item">
                  <b className="text-title">Symbol :</b> {companyData.Symbol}
                </a>
                <a className="dropdown-item">
                  <b className="text-title"> Name :</b> {companyData.Name}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">Sector :</b> {companyData.Sector}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">Industry :</b>{" "}
                  {companyData.Industry}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">MarketCapitalization :</b>{" "}
                  {companyData.MarketCapitalization}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">EBITDA :</b> {companyData.EBITDA}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">PERatio :</b> {companyData.PERatio}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">PEGRatio :</b>{" "}
                  {companyData.PEGRatio}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">BookValue :</b>{" "}
                  {companyData.BookValue}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">DividendPerShare :</b>{" "}
                  {companyData.DividendPerShare}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">DividendYield :</b>{" "}
                  {companyData.DividendYield}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">EPS :</b> {companyData.EPS}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">ProfitMargin :</b>{" "}
                  {companyData.ProfitMargin}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">OperatingMarginTTM :</b>{" "}
                  {companyData.OperatingMarginTTM}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">ReturnOnAssets :</b>{" "}
                  {companyData.ReturnOnAssetsTTM}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">ReturnOnEquity :</b>{" "}
                  {companyData.ReturnOnEquityTTM}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">GrossProfit :</b>{" "}
                  {companyData.GrossProfitTTM}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">TrailingPE :</b>{" "}
                  {companyData.TrailingPE}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">ForwardPE :</b>{" "}
                  {companyData.ForwardPE}
                </a>
              </div>
            )}
          </div>
          <div className="col-2 p-0 mx-1">
            <button
              className="btn btn-secondary btn-block h-100"
             
              id="companyOverviewDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Income Statement
            </button>
            {companyData && (
              <div
                className="dropdown-menu"
                aria-labelledby="companyOverviewDropdown"
              >
                <a className="dropdown-item">
                  <b className="text-title">Symbol :</b> {companyData.Symbol}
                </a>
                <a className="dropdown-item">
                  <b className="text-title"> Name :</b> {companyData.Name}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">Sector :</b> {companyData.Sector}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">Industry :</b>{" "}
                  {companyData.Industry}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">MarketCapitalization :</b>{" "}
                  {companyData.MarketCapitalization}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">EBITDA :</b> {companyData.EBITDA}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">PERatio :</b> {companyData.PERatio}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">PEGRatio :</b>{" "}
                  {companyData.PEGRatio}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">BookValue :</b>{" "}
                  {companyData.BookValue}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">DividendPerShare :</b>{" "}
                  {companyData.DividendPerShare}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">DividendYield :</b>{" "}
                  {companyData.DividendYield}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">EPS :</b> {companyData.EPS}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">ProfitMargin :</b>{" "}
                  {companyData.ProfitMargin}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">OperatingMarginTTM :</b>{" "}
                  {companyData.OperatingMarginTTM}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">ReturnOnAssets :</b>{" "}
                  {companyData.ReturnOnAssetsTTM}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">ReturnOnEquity :</b>{" "}
                  {companyData.ReturnOnEquityTTM}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">GrossProfit :</b>{" "}
                  {companyData.GrossProfitTTM}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">TrailingPE :</b>{" "}
                  {companyData.TrailingPE}
                </a>
                <a className="dropdown-item">
                  <b className="text-title">ForwardPE :</b>{" "}
                  {companyData.ForwardPE}
                </a>
              </div>
            )}  
          </div>
          <div className="col-2 p-0 mx-1">
            <button className="btn btn-secondary btn-block h-100">
              Balance Sheet
            </button>
          </div>
          <div className="col-2 p-0 mx-1">
            <button className="btn btn-secondary btn-block h-100">
              Cash Flow
            </button>
          </div>
          <div className="col-2 p-0 ml-1">
            <button className="btn btn-secondary btn-block h-100">
              Earnings
            </button>
          </div>
        </div>
      </div> */}
      <br /> <br /> <br /> <br /> <br /> <br />
      <br />
    </>
  );
}
export default StockPrice;
