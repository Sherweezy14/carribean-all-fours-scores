export default function Rankings(){





    return(
        <section>
            <div className="border-2 border-gray-100 rounded-md px-2 py-3">
                <div className="flex flex-col">
                    <div className="flex items-center lg:flex-col lg:items-start">
                        <span className="font-display text-blue-950 text-2xl mr-2">Top Rankings</span>
                        <span className="text-red-500" > Division A</span>
                    </div>
                    <div className="border-2 overflow-hidden border-gray-100 text-sm lg:text-xl rounded-lg text-center">
                    <table className="w-full">
                        <tr className="font-display tracking-wide bg-slate-100">
                            <td>#</td>
                            <td>team</td>
                            <td>W</td>
                            <td>PTS</td>
                            <td>Bullseyes</td>
                            <td>Hangjacks</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Four Play</td>
                            <td>4</td>
                            <td>12</td>
                            <td>20</td>
                            <td>8</td>
                        </tr>
                    </table>
                    </div>
                    
                    <div className="bg-red-700 rounded-md shadow-md cursor-pointer mt-2">
                        <p className="text-white font-display text-xl text-center">View full Rankings</p>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}