import { Radio, Calendar, Trophy, Users, Layers } from "lucide-react";

export default function QuickNav() {
  const links = [
    { name: "LIVE", icon: Radio, route: "/" },
    { name: "SCHEDULE", icon: Calendar, route: "/" },
    { name: "RANKINGS", icon: Trophy, route: "/" },
    { name: "TEAMS", icon: Users, route: "/" },
    { name: "DIVISIONS", icon: Layers, route: "/" },
  ];

  return (
    <section className="mt-4 grid grid-cols-5 gap-2 px-5 md:gap-5 lg:hidden">
      {links.map((link) => {
        return (
          <div
            key={link.name}
            className="group
            flex
            h-16
            cursor-pointer
            flex-col
            items-center  justify-center rounded-md border-2 border-gray-100 bg-[#f8fafc] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-red-700 hover:text-white hover:shadow-lg md:h-20"
          >
            <link.icon className=" mb-1" />
            <p className="text-xs">{link.name}</p>
          </div>
        );
      })}
    </section>
  );
}
