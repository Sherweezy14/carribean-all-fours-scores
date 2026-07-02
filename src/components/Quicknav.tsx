import { Radio, Calendar, Trophy, Users, Layers } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuickNav() {
  const links = [
    { name: "HOME", icon: Radio, route: "/" },
    { name: "SCHEDULE", icon: Calendar, route: "/schedule" },
    { name: "RANKINGS", icon: Trophy, route: "/rankings" },
    { name: "TEAMS", icon: Users, route: "/teams" },
    { name: "DIVISIONS", icon: Layers, route: "/divisions" },
  ];

  return (
    <section className="mt-4 grid grid-cols-5 gap-2 px-5 md:gap-5 lg:hidden">
      {links.map((link) => {
        return (
          <Link key={link.name} to={link.route}>
            <div
              className="group
            flex
            h-16
            cursor-pointer
            flex-col
            items-center  justify-center rounded-md border-2 border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-red-700 hover:text-white hover:shadow-lg md:h-20"
            >
              <link.icon className=" mb-1" />
              <p className="text-[.5rem] md:text-xl">{link.name}</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
