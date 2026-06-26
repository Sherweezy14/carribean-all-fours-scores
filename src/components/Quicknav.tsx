import {
    Radio,
    Calendar,
    Trophy,
    Users,
    Layers,
  } from "lucide-react";

export default function QuickNav(){
    const links = [
    {name:"LIVE", icon:Radio ,route:"/"},
    {name:"SCHEDULE", icon:Calendar ,route:"/"},
    {name:"RANKINGS", icon:Trophy ,route:"/"},
    {name:"TEAMS", icon:Users ,route:"/"},
    {name:"DIVISIONS", icon:Layers ,route:"/"},]





    return(<section className="grid grid-cols-5 px-5 gap-2 md:gap-5 mt-4 lg:hidden">
        {links.map((link)=>{
            return(<div className="group
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-200
            cursor-pointer  hover:text-white hover:bg-red-500 flex flex-col bg-[#f8fafc] items-center justify-center h-16 rounded-md shadow-sm border-gray-100 border-2 md:h-20">
            <link.icon className=" mb-1"/>
            <p className="text-xs">{link.name}</p>
            </div>)
        })}
        
    </section>)
}