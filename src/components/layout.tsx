import Navbar from "./Navbar";
import QuickNav from "./Quicknav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
export default function Layout() {
  return (
    <>
      <Navbar />
      <QuickNav />
      <Outlet />
      <div className="flex-1"></div>
      <Footer />
    </>
  );
}
