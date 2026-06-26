import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import QuickNav from "./components/Quicknav";
import NewHome from "./components/Newhome";

function App() {
  return (
    <>
      <Navbar />
      <QuickNav />
      <NewHome />
    </>
  );
}

export default App;
