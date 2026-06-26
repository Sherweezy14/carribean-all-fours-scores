import {
    Radio,
  
  } from "lucide-react";
import ScoresCard from "./Scorescard";
import Rankings from "./Rankings";
import TournamentStats from "./Tournamentstats";

export default function NewHome(){


    return(
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-2 px-5 py-5 grid-flow-row-dense ">
            <div className="col-span-1 md:col-span-2 pl-2 flex flex-col gap-2 ">
                <div className="flex justify-between pb-5">
                    <div className="flex md:flex-col">
                        <div className="flex gap-2 pt-2">
                            <Radio className="hidden md:block text-red-500"/> <p className=" font-display text-3xl">LIVE SCORES</p>
                        </div>
                        <p className="hidden md:block">Stay Up to Date With Live Scores</p>
                    </div >
        
                    <div className="pt-2"><p className="text-white  font-display text-sm bg-red-900 rounded-md py-1 px-3">View All </p>
                    </div>

                </div>
                
                 {/* Card Component*/}
                <ScoresCard />

            </div>
            
            <div className="col-span-1">
                <Rankings />
                <TournamentStats />
            </div>

        </section> )
}