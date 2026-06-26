import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import QuickNav from "./components/Quicknav";
import NewHome from "./components/Newhome";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <QuickNav />
      <NewHome />
      <div className="flex-1"></div>
      <Footer />
    </div>
  );
}

export default App;
