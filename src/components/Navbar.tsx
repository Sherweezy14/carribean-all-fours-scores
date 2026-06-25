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
} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex bg-[#f8fafc] border-b border-slate-200 justify-between items-center min-w-xl pl-5  h-36 border-1">
      {/* Floating cards over nav */}
      <div className="absolute top-0 right-0 w-40 h-36 overflow-hidden"></div>
      {/* Floating cards over nav */}

      <div className="border-1 flex items-center">
        <div>
          <img className="h-40" src={logo} alt="" />
        </div>
        <div className="flex-col pl-5 gap-2">
          <p className="font-display text-7xl tracking-[0.05em] text-[#071b3a]">
            ALL FOURS
          </p>
          <p className="font-display text-2xl tracking-[0.111em] -mt-2 text-red-700">
            ROUND ROBIN TOURNAMENT
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center divide-x divide-slate-300 mt-7">
        <div className="group flex flex-col items-center px-8 cursor-pointer">
          <Radio
            size={30}
            className="
      text-slate-800
      transition-all
      duration-200
      group-hover:text-[#b11226]
    "
          />
          <p
            className="
      text-base
      transition-all
      duration-200
      border-b-2
      border-transparent
      group-hover:border-[#b11226]
      group-hover:text-[#b11226]
    "
          >
            LIVE
          </p>
        </div>
        <div className="group flex flex-col items-center px-8 cursor-pointer">
          <Calendar
            size={30}
            className="
      text-slate-800
      transition-all
      duration-200
      group-hover:text-[#b11226]
    "
            strokeWidth={1.5}
          />
          <p
            className="
      text-base
      transition-all
      duration-200
      border-b-2
      border-transparent
      group-hover:border-[#b11226]
      group-hover:text-[#b11226]
    "
          >
            SCHEDULE
          </p>
        </div>
        <div className="group flex flex-col items-center px-8 cursor-pointer">
          <Trophy
            size={30}
            className="
      text-slate-800
      transition-all
      duration-200
      group-hover:text-[#b11226]
    "
          />
          <p
            className="
      text-base
      transition-all
      duration-200
      border-b-2
      border-transparent
      group-hover:border-[#b11226]
      group-hover:text-[#b11226]
    "
          >
            RANKINGS
          </p>
        </div>
        <div className="group flex flex-col items-center px-8 cursor-pointer">
          <Users
            size={30}
            className="
      text-slate-800
      transition-all
      duration-200
      group-hover:text-[#b11226]
    "
          />
          <p
            className="
      text-base
      transition-all
      duration-200
      border-b-2
      border-transparent
      group-hover:border-[#b11226]
      group-hover:text-[#b11226]
    "
          >
            TEAMS
          </p>
        </div>
        <div className="group flex flex-col items-center px-8 cursor-pointer">
          <Layers
            size={30}
            className="
      text-slate-800
      transition-all
      duration-200
      group-hover:text-[#b11226]
    "
          />
          <p
            className="
      text-base
      transition-all
      duration-200
      border-b-2
      border-transparent
      group-hover:border-[#b11226]
      group-hover:text-[#b11226]
    "
          >
            DIVISIONS
          </p>
        </div>
        <div className="group flex flex-col items-center px-8 cursor-pointer">
          <ShieldAlert
            size={30}
            className="
      text-slate-800
      transition-all
      duration-200
      group-hover:text-[#b11226]
    "
          />
          <p
            className="
      text-base
      transition-all
      duration-200
      border-b-2
      border-transparent
      group-hover:border-[#b11226]
      group-hover:text-[#b11226]
    "
          >
            ABOUT
          </p>
        </div>
        <div></div>
      </div>
      <div className="h-36 w-48">
        <img
          src={cards}
          alt=""
          className="w-full
    "
        />
      </div>
    </nav>
  );
}
