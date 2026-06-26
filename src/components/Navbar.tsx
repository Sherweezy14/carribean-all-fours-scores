import logo from "../assets/logo_nav.png";
import cards from "../assets/cards.png";
import React from "react";

import {
  Radio,
  Calendar,
  Trophy,
  Users,
  Layers,
  ShieldAlert,
  BellRing,
} from "lucide-react";
import { NativeBuffer } from "mongoose";

export default function Navbar() {
  const navLinks = [
    { name: "live", link: "/", icon: Radio },
    { name: "schedule", link: "/", icon: Calendar },
    { name: "rankings", link: "/", icon: Trophy },
    { name: "teams", link: "/", icon: Users },
    { name: "divisions", link: "/", icon: Layers },
    { name: "about", link: "/", icon: ShieldAlert },
  ];

  return (
    <nav className="flex font-display bg-[#f8fafc] border-b border-slate-200 justify-between items-center min-w-xl   h-20 md:h-24  lg:h-24 border-1">
      <div className="text-3xl  pl-2 md:text-4xl md:m-2 lg:hidden">☰</div>

      <div className="border-1 flex items-center lg:pl-2 ">
        <div>
          <img className="h-20 md:h-24 lg:h-24" src={logo} alt="" />
        </div>
        <div className="flex-col px-2 gap-2">
          <p className="font-display text-4xl tracking-[0.081em] md:text-5xl  text-[#071b3a]">
            ALL FOURS
          </p>
          <p className="font-display text-md tracking-[0.021em] md:tracking-[0.041em] md:text-xl -mt-2 text-red-700">
            ROUND ROBIN TOURNAMENT
          </p>
        </div>
      </div>
      <div className=" hidden lg:flex items-center divide-x divide-slate-300 mt-2 md:mt-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <div
              key={link.name}
              className="group flex flex-col items-center px-3 md:px-4 lg:px-6 cursor-pointer"
            >
              <Icon
                size={26}
                className="
text-slate-800
transition-all
duration-200
group-hover:text-[#b11226]
"
              />
              <p
                className="
      text-sm
      transition-all
      duration-200
      border-b-2
      border-transparent
      group-hover:border-[#b11226]
      group-hover:text-[#b11226]
    "
              >
                {link.name.toUpperCase()}
              </p>
            </div>
          );
        })}

        <div></div>
      </div>
      <div className=" px-5  md:h-24  md:px-0 ">
        <img
          src={cards}
          alt=""
          className="hidden w-full h-full md:block
    "
        />
        <BellRing size="22" className="hover:text-red-600 md:hidden"/>
      </div>
    </nav>
  );
}
