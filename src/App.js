import "./App.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import StockPrice from "./Content/CentralContent";
import NewsPage from "./Content/NewsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";




function App() {
  return (
    <>
      <Navbar />
      <StockPrice />
      <BrowserRouter>
        <Routes>
          <Route path="news" element={<NewsPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </>
  );
}

export default App;
