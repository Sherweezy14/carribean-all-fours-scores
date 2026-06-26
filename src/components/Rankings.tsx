export default function Rankings() {
  return (
    <section>
      <div className="rounded-md border-2 border-gray-100 px-2 py-3">
        <div className="flex flex-col">
          <div className="flex items-center lg:flex-col lg:items-start">
            <span className="mr-2 font-display text-2xl text-blue-950">
              Top Rankings
            </span>
            <span className="text-red-500"> Division A</span>
          </div>
          <div className="overflow-hidden rounded-lg border-2 border-gray-100 text-center text-sm lg:text-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 font-display tracking-wide">
                  <td>#</td>
                  <td>team</td>
                  <td>W</td>
                  <td>PTS</td>
                  <td>Bullseyes</td>
                  <td>Hangjacks</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Four Play</td>
                  <td>4</td>
                  <td>12</td>
                  <td>20</td>
                  <td>8</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-2 cursor-pointer rounded-md bg-red-700 shadow-md">
            <p className="text-center font-display text-xl text-white">
              View full Rankings
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
