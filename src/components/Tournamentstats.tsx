import {Target,Gamepad,Spade} from "lucide-react"
export default function TournamentStats(){



    return(
        <section className="px-2 font-display py-3 border-2 border-gray-100 mt-3 rounded-md flex flex-col">
            <div className="  text-blue-950 text-2xl tracking-wide">Tournment STATS
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col items-center">
                    <Target size={48} className="text-red-700"/>
                    <p className="text-2xl">Bullseyes</p>
                    <p className="text-6xl">142</p>
                </div>
                <div className="flex flex-col items-center">
                    <Spade size={48} className="text-yellow-400" />
                    <p className="text-2xl">Hangjacks</p>
                    <p className="text-6xl">97</p>
                </div>
                <div className="flex flex-col items-center">
                    <Gamepad size={48} className="text-blue-950" />
                    <p className="text-2xl">Games played</p>
                    <p className="text-6xl">34</p>
                </div>
            </div>
        </section>
    )
}