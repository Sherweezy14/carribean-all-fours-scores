import { Users, Clock } from "lucide-react";

export default function ScoresCard() {
  return (
    <div
      className="col-span-1 flex cursor-pointer justify-between rounded-md border-2
        border-gray-100
        px-2
        py-1 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl md:col-span-2"
    >
      <div className="flex flex-col px-2 py-1 md:flex-row ">
        <div className="flex flex-col items-center pr-2 text-white">
          <div className="mb-2   rounded-md bg-red-500 px-1 py-1 text-xs font-bold md:text-sm">
            Live Now
          </div>
          <div className="rounded-full bg-red-900 px-3 py-3">
            <Users size={24} strokeWidth={3} />
          </div>
        </div>
        <div className="flex flex-col pt-1 text-xs">
          <div className="mb-3 hidden  font-semibold text-red-500 md:block">
            Division A
          </div>
          <div className="text-md font-bold md:text-xl">Four Play</div>
          <div>Bullseys: 5</div>
          <div>HangJack: 2</div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-xs">
          <span className="block font-semibold text-red-500 md:hidden">
            {" "}
            Division A
          </span>
          <span className="block md:inline"> Started </span> 7:15 PM
        </div>
        <div className=" font-display text-4xl md:text-7xl ">78-62</div>
        <div className="md:text-md font-sm flex items-center justify-center gap-1 text-sm">
          {" "}
          <Clock size={12} className="" /> 00:45:32
        </div>
      </div>
      <div className="flex flex-col px-2 pt-8 md:flex-row ">
        <div className="order-2 flex flex-col pt-1 text-end text-xs md:order-1">
          <div className=" font-bold md:text-xl">High Rollers</div>
          <div>Bullseys: 5</div>
          <div>HangJack: 2</div>
        </div>
        <div className="order-1 flex flex-col items-center px-2 pt-1 text-white md:order-2">
          <div className="rounded-full bg-yellow-500 px-3 py-3 ">
            <Users size={24} strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
