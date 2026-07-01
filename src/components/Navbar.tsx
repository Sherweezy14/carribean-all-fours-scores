import logo from "../assets/logo_nav.png";
import cards from "../assets/cards.png";
import { Link } from "react-router-dom";

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
    <nav className="min-w-xl border-1 flex h-20 items-center justify-between border-b border-slate-200   bg-[#f8fafc] font-display  md:h-24 lg:h-24">
      <div className="pl-2  text-3xl md:m-2 md:text-4xl lg:hidden">☰</div>
      <Link to="/">
        <div className="border-1 flex items-center lg:pl-2 ">
          <div>
            <img className="h-20 md:h-24 lg:h-24" src={logo} alt="" />
          </div>
          <div className="flex-col gap-2 px-2">
            <p className="font-display text-4xl tracking-[0.081em] text-[#071b3a]  md:text-5xl">
              ALL FOURS
            </p>
            <p className="text-md -mt-2 font-display tracking-[0.021em] text-red-700 md:text-xl md:tracking-[0.041em]">
              ROUND ROBIN TOURNAMENT
            </p>
          </div>
        </div>
      </Link>
      <div className=" mt-2 hidden items-center divide-x divide-slate-300 md:mt-4 lg:flex">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <div
              key={link.name}
              className="group flex cursor-pointer flex-col items-center px-3 md:px-4 lg:px-6"
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
      border-b-2
      border-transparent
      text-xl
      tracking-wider
      transition-all
      duration-200
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
          className="hidden h-full w-full md:block
    "
        />
        <BellRing size="22" className="hover:text-red-600 md:hidden" />
      </div>
    </nav>
  );
}
