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

export default function Navbar() {
  const navLinks = [
    { name: "Home", link: "/", icon: Radio },
    { name: "schedule", link: "/schedule", icon: Calendar },
    { name: "rankings", link: "/rankings", icon: Trophy },
    { name: "teams", link: "/teams", icon: Users },
    { name: "divisions", link: "/divisions", icon: Layers },
    { name: "about", link: "/about", icon: ShieldAlert },
  ];

  return (
    <nav className=" border-1 flex h-20 items-center justify-between border-b border-slate-200 bg-[#041533]   font-display text-white  md:h-24 lg:h-24">
      <div className="pl-2  text-3xl md:m-2 md:text-4xl lg:hidden">☰</div>
      <Link to="/">
        <div className="border-1 flex items-center lg:pl-2 ">
          <div className="pt-2">
            <img
              className=" h-24 w-auto md:block md:h-32 lg:h-32"
              src={logo}
              alt=""
            />
          </div>
          <div className="flex-col gap-2 px-2">
            <p className="font-display text-4xl tracking-[0.081em] text-white  md:text-5xl">
              ALL FOURS
            </p>
            <p className="text-md -mt-2 font-display tracking-[0.021em] text-red-700 md:text-xl md:tracking-[0.041em]">
              ROUND ROBIN TOURNAMENT
            </p>
          </div>
        </div>
      </Link>
      <div className=" mt-2 hidden items-center divide-x divide-slate-300 text-white md:mt-4 lg:flex">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.name} to={link.link}>
              <div className="group flex cursor-pointer flex-col items-center px-3 md:px-4 lg:px-6">
                <Icon
                  size={26}
                  className="
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
      tracking-wide
      transition-all
      duration-200
      group-hover:border-[#b11226]
      group-hover:text-[#b11226]
    "
                >
                  {link.name.toUpperCase()}
                </p>
              </div>
            </Link>
          );
        })}

        <div></div>
      </div>
      <div className=" flex w-auto items-center justify-end px-5 md:h-24 md:px-0 ">
        <Link to={"/about"}>
          <BellRing
            size="22"
            className="justify-center hover:text-red-600 lg:hidden"
          />
        </Link>

        <img
          src={cards}
          alt=""
          className="hidden h-24 w-auto object-contain md:block
    "
        />
      </div>
    </nav>
  );
}
