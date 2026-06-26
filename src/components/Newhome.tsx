import {
    Radio,
    Users,
    Clock
  
  } from "lucide-react";

export default function NewHome(){


    return(
        <section className="  grid grid-cols-1 lg:grid-cols-3 gap-2 px-5 py-5 grid-flow-row-dense ">
            <div className="col-span-1 md:col-span-2 pl-2 flex justify-between">
                <div className="flex md:flex-col">
                    <div className="flex gap-2">
                        <Radio className="hidden md:block text-red-500"/> <p className=" font-display text-3xl">LIVE SCORES</p>
                    </div>
                    <p className="hidden md:block">Stay Up to Date With Live Scores</p>
                </div >
    
                <div ><p className="text-white  font-display text-sm bg-red-900 rounded-md py-1 px-3">View All </p>
                </div>
            </div>
             {/* Card Component*/}
             <div className="flex justify-between col-span-1 md:col-span-2 border-gray-100 shadow-md
hover:shadow-xl
hover:-translate-y-1
transition-all duration-200 border-2 cursor-pointer rounded-md py-1 px-2">
                    <div className="flex flex-col md:flex-row px-2 py-1 ">
                        <div className="flex flex-col items-center text-white pr-2">
                            <div className="bg-red-500   px-1 py-1 text-xs md:text-sm rounded-md font-bold mb-2">Live Now</div>
                            <div className="bg-red-900 px-3 py-3 rounded-full"><Users size={24} strokeWidth={3} /></div>
                        </div>
                        <div className="flex flex-col pt-1 text-xs">
                            <div className="mb-3 text-red-500  hidden md:block font-semibold">Division A</div>
                            <div className="text-md font-bold md:text-xl">Four Play</div>
                            <div >Bullseys:  5</div>
                            <div>HangJack:  2</div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center text-center items-center">
                        <div className="text-xs"><span className="block font-semibold text-red-500 md:hidden"> Division A</span><span className="block md:inline"> Started </span>  7:15 PM</div>
                        <div className=" font-display text-4xl md:text-7xl ">78-62</div>
                        <div className="flex justify-center text-sm md:text-md items-center gap-1 font-sm"> <Clock size={12} className=""/>  00:45:32</div>
                    </div>
                    <div className="flex flex-col md:flex-row px-2 pt-8 ">
                      
                        <div className="flex order-2 md:order-1 flex-col pt-1 text-xs text-end">
                            <div className=" font-bold md:text-xl">High Rollers</div>
                            <div>Bullseys:  5</div>
                            <div>HangJack:  2</div>
                        </div>
                        <div className="flex order-1 md:order-2 flex-col items-center text-white px-2 pt-1">
                            <div className="bg-yellow-500 px-3 py-3 rounded-full "><Users size={24} strokeWidth={3} /></div>
                        </div>
                    </div>
                </div>
           
            <div className="col-span-1">
                right
            </div>
        </section> )
}