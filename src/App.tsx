import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import QuickNav from "./components/Quicknav";

function App() {
  return (
    <>
      <Navbar />
      <QuickNav />
    </>
  );
}

export default App;
