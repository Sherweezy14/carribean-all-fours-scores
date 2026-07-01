import tournamentPhoto from "../assets/tournamentphoto.jpg";

export default function About() {
  return (
    <main className="bg-slate-50 px-4 py-8 md:px-8">
      <section className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[280px]">
            <img
              src={tournamentPhoto}
              alt="Unity Sports Club Round Robin All Fours Tournament"
              className="h-full w-full object-cover"
            />
            <div className="absolute left-4 top-4 rounded-full bg-red-700 px-4 py-2 text-sm font-bold text-white">
              Since 1980
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 md:p-10">
            <p className="font-display text-lg tracking-[0.2em] text-red-700">
              UNITY SPORTS CLUB
            </p>

            <h1 className="font-display text-5xl leading-none tracking-wide text-[#071b3a] md:text-7xl">
              ROUND ROBIN
            </h1>

            <p className="mt-2 font-display text-2xl tracking-widest text-yellow-500">
              ALL FOURS TOURNAMENT
            </p>

            <p className="mt-6 text-base leading-7 text-slate-700 md:text-lg">
              Since 1980, the Unity Sports Club Round Robin All Fours Tournament
              has been a proud Boston tradition. Founded by Clarence Cooper and
              Unity Sports Club, the tournament was created to preserve the
              Caribbean card game of All Fours while bringing players together
              through competition, sportsmanship, and community.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="font-display text-3xl text-red-700">45+ YEARS</p>
          <p className="mt-2 text-slate-600">
            A long-running tournament tradition started in Boston in 1980.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="font-display text-3xl text-blue-900">COMMUNITY</p>
          <p className="mt-2 text-slate-600">
            Bringing generations of All Fours players and supporters together.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="font-display text-3xl text-yellow-500">LEGACY</p>
          <p className="mt-2 text-slate-600">
            Honoring Clarence Cooper’s vision and Unity Sports Club’s history.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl rounded-3xl bg-white p-6 shadow-sm md:p-10">
        <h2 className="font-display text-4xl tracking-wide text-[#071b3a]">
          About the Game
        </h2>

        <p className="mt-4 leading-7 text-slate-700">
          All Fours is a classic Caribbean trick-taking card game built on
          strategy, teamwork, communication, and skill. The Round Robin format
          gives each team the opportunity to compete, build points, and climb
          the standings through strong play and consistent results.
        </p>

        <p className="mt-4 leading-7 text-slate-700">
          Today, this app continues the tournament’s legacy by making live
          scores, schedules, rankings, bullseyes, hangjacks, and results easier
          for players and spectators to follow.
        </p>
      </section>
    </main>
  );
}
