import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import QuickNav from "./components/Quicknav";
import NewHome from "./components/Newhome";
import Footer from "./components/Footer";
import { setup } from "./util/TornamentSetUp";

function App() {
  console.log("this is what tournament returns", setup());
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <QuickNav />
      <NewHome />
      <div className="flex-1"></div>
      <Footer />
    </div>
  );
}

export default App;
