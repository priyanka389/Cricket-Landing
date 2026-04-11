// import React, { useRef } from 'react'
// import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react'

// const SeriesStandings = () => {
//   const scrollRef = useRef(null)

//   const upcomingSeries = [
//     {
//       id: 1,
//       name: 'T20 World Cup',
//       dates: 'Mar 22 - Sep 23',
//       logo: '🏆',
//       color: 'from-purple-500 to-pink-500',
//       teams: 16,
//     },
//     {
//       id: 2,
//       name: 'IPL 2024',
//       dates: 'Mar 23 - May 23',
//       logo: '🏏',
//       color: 'from-blue-500 to-cyan-500',
//       teams: 10,
//     },
//     {
//       id: 3,
//       name: 'The Ashes',
//       dates: 'Jun 24 - Aug 24',
//       logo: '🔥',
//       color: 'from-orange-500 to-red-500',
//       teams: 2,
//     },
//     {
//       id: 4,
//       name: 'PSL 2024',
//       dates: 'Feb 24 - Mar 24',
//       logo: '⭐',
//       color: 'from-green-500 to-emerald-500',
//       teams: 6,
//     },
//   ]

//   const group1Standings = [
//     { pos: 1, team: 'Mumbai Indians', played: 8, won: 6, lost: 2, pts: 12, nrr: '+0.58' },
//     { pos: 2, team: 'Chennai Super Kings', played: 8, won: 5, lost: 3, pts: 10, nrr: '+0.42' },
//     { pos: 3, team: 'Delhi Capitals', played: 8, won: 5, lost: 3, pts: 10, nrr: '+0.15' },
//     { pos: 4, team: 'Rajasthan Royals', played: 8, won: 4, lost: 4, pts: 8, nrr: '-0.12' },
//   ]

//   const group2Standings = [
//     { pos: 1, team: 'Kolkata Knight Riders', played: 8, won: 6, lost: 2, pts: 12, nrr: '+0.74' },
//     { pos: 2, team: 'Sunrisers Hyderabad', played: 8, won: 5, lost: 3, pts: 10, nrr: '+0.28' },
//     { pos: 3, team: 'Royal Challengers', played: 8, won: 4, lost: 4, pts: 8, nrr: '-0.05' },
//     { pos: 4, team: 'Punjab Kings', played: 8, won: 3, lost: 5, pts: 6, nrr: '-0.38' },
//   ]

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = 320
//       scrollRef.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth'
//       })
//     }
//   }

//   return (
//     <section id="series" className="py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <div className="flex items-center justify-between mb-8 animate-slide-up">
//           <h2 className="text-2xl md:text-3xl font-bold text-white">
//             Extended Series <span className="text-accent">&</span> Standings
//           </h2>
//           <div className="flex gap-2">
//             <button
//               onClick={() => scroll('left')}
//               className="p-2 bg-secondary border border-border rounded-lg hover:border-accent transition-colors"
//             >
//               <ChevronLeft size={20} className="text-text-secondary" />
//             </button>
//             <button
//               onClick={() => scroll('right')}
//               className="p-2 bg-secondary border border-border rounded-lg hover:border-accent transition-colors"
//             >
//               <ChevronRight size={20} className="text-text-secondary" />
//             </button>
//           </div>
//         </div>

//         {/* Upcoming Series Carousel */}
//         <div className="mb-12">
//           <h3 className="text-lg font-semibold text-text-secondary mb-4">Upcoming Series</h3>
//           <div
//             ref={scrollRef}
//             className="horizontal-scroll gap-6 pb-4"
//           >
//             {upcomingSeries.map((series, index) => (
//               <div
//                 key={series.id}
//                 className={`w-[280px] bg-secondary rounded-xl overflow-hidden border border-border card-glow hover-lift tilt-card animate-slide-up`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className={`h-32 bg-gradient-to-br ${series.color} flex items-center justify-center`}>
//                   <span className="text-6xl">{series.logo}</span>
//                 </div>
//                 <div className="p-4">
//                   <h4 className="font-bold text-white text-lg mb-1">{series.name}</h4>
//                   <p className="text-text-muted text-sm mb-3">{series.dates}</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs text-text-muted">{series.teams} Teams</span>
//                     <button className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full hover:bg-accent/20 transition-colors">
//                       View
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* League Standings */}
//         <div>
//           <h3 className="text-lg font-semibold text-text-secondary mb-4">Detailed League Standings</h3>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Group 1 */}
//             <div className="bg-secondary rounded-xl overflow-hidden border border-border animate-slide-left">
//               <div className="p-4 border-b border-border bg-primary/50">
//                 <h4 className="font-semibold text-white flex items-center gap-2">
//                   <Trophy size={18} className="text-accent" />
//                   Group A
//                 </h4>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="text-xs text-text-muted border-b border-border">
//                       <th className="py-3 px-4 text-left">Pos</th>
//                       <th className="py-3 px-4 text-left">Team</th>
//                       <th className="py-3 px-4 text-center">P</th>
//                       <th className="py-3 px-4 text-center">W</th>
//                       <th className="py-3 px-4 text-center">L</th>
//                       <th className="py-3 px-4 text-center">Pts</th>
//                       <th className="py-3 px-4 text-right">NRR</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {group1Standings.map((team, index) => (
//                       <tr
//                         key={team.team}
//                         className="text-sm border-b border-border last:border-0 table-row-hover animate-fade-in"
//                         style={{ animationDelay: `${index * 0.1}s` }}
//                       >
//                         <td className="py-3 px-4">
//                           <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
//                             team.pos <= 2 ? 'bg-accent text-primary' : 'bg-border text-text-secondary'
//                           }`}>
//                             {team.pos}
//                           </span>
//                         </td>
//                         <td className="py-3 px-4 font-medium text-white">{team.team}</td>
//                         <td className="py-3 px-4 text-center text-text-secondary">{team.played}</td>
//                         <td className="py-3 px-4 text-center text-accent">{team.won}</td>
//                         <td className="py-3 px-4 text-center text-danger">{team.lost}</td>
//                         <td className="py-3 px-4 text-center font-bold text-white">{team.pts}</td>
//                         <td className={`py-3 px-4 text-right font-medium ${
//                           team.nrr.startsWith('+') ? 'text-accent' : 'text-danger'
//                         }`}>
//                           {team.nrr}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Group 2 */}
//             <div className="bg-secondary rounded-xl overflow-hidden border border-border animate-slide-right">
//               <div className="p-4 border-b border-border bg-primary/50">
//                 <h4 className="font-semibold text-white flex items-center gap-2">
//                   <Trophy size={18} className="text-accent" />
//                   Group B
//                 </h4>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="text-xs text-text-muted border-b border-border">
//                       <th className="py-3 px-4 text-left">Pos</th>
//                       <th className="py-3 px-4 text-left">Team</th>
//                       <th className="py-3 px-4 text-center">P</th>
//                       <th className="py-3 px-4 text-center">W</th>
//                       <th className="py-3 px-4 text-center">L</th>
//                       <th className="py-3 px-4 text-center">Pts</th>
//                       <th className="py-3 px-4 text-right">NRR</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {group2Standings.map((team, index) => (
//                       <tr
//                         key={team.team}
//                         className="text-sm border-b border-border last:border-0 table-row-hover animate-fade-in"
//                         style={{ animationDelay: `${index * 0.1}s` }}
//                       >
//                         <td className="py-3 px-4">
//                           <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
//                             team.pos <= 2 ? 'bg-accent text-primary' : 'bg-border text-text-secondary'
//                           }`}>
//                             {team.pos}
//                           </span>
//                         </td>
//                         <td className="py-3 px-4 font-medium text-white">{team.team}</td>
//                         <td className="py-3 px-4 text-center text-text-secondary">{team.played}</td>
//                         <td className="py-3 px-4 text-center text-accent">{team.won}</td>
//                         <td className="py-3 px-4 text-center text-danger">{team.lost}</td>
//                         <td className="py-3 px-4 text-center font-bold text-white">{team.pts}</td>
//                         <td className={`py-3 px-4 text-right font-medium ${
//                           team.nrr.startsWith('+') ? 'text-accent' : 'text-danger'
//                         }`}>
//                           {team.nrr}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default SeriesStandings



import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react'

const SeriesStandings = () => {
  const scrollRef = useRef(null)

  const upcomingSeries = [
    {
      id: 1,
      name: 'T20 World Cup',
      dates: 'Mar 22 - Sep 23',
      logo: '🏆',
      color: 'from-purple-400 to-pink-400',
      teams: 16,
    },
    {
      id: 2,
      name: 'IPL 2024',
      dates: 'Mar 23 - May 23',
      logo: '🏏',
      color: 'from-blue-400 to-cyan-400',
      teams: 10,
    },
    {
      id: 3,
      name: 'The Ashes',
      dates: 'Jun 24 - Aug 24',
      logo: '🔥',
      color: 'from-orange-400 to-red-400',
      teams: 2,
    },
    {
      id: 4,
      name: 'PSL 2024',
      dates: 'Feb 24 - Mar 24',
      logo: '⭐',
      color: 'from-green-400 to-emerald-400',
      teams: 6,
    },
  ]

  const group1Standings = [
    { pos: 1, team: 'Mumbai Indians', played: 8, won: 6, lost: 2, pts: 12, nrr: '+0.58' },
    { pos: 2, team: 'Chennai Super Kings', played: 8, won: 5, lost: 3, pts: 10, nrr: '+0.42' },
    { pos: 3, team: 'Delhi Capitals', played: 8, won: 5, lost: 3, pts: 10, nrr: '+0.15' },
    { pos: 4, team: 'Rajasthan Royals', played: 8, won: 4, lost: 4, pts: 8, nrr: '-0.12' },
  ]

  const group2Standings = [
    { pos: 1, team: 'Kolkata Knight Riders', played: 8, won: 6, lost: 2, pts: 12, nrr: '+0.74' },
    { pos: 2, team: 'Sunrisers Hyderabad', played: 8, won: 5, lost: 3, pts: 10, nrr: '+0.28' },
    { pos: 3, team: 'Royal Challengers', played: 8, won: 4, lost: 4, pts: 8, nrr: '-0.05' },
    { pos: 4, team: 'Punjab Kings', played: 8, won: 3, lost: 5, pts: 6, nrr: '-0.38' },
  ]

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="series" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Extended Series <span className="text-blue-600">&</span> Standings
          </h2>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')}
              className="p-2 bg-white border rounded-lg hover:border-blue-500 shadow-sm">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button onClick={() => scroll('right')}
              className="p-2 bg-white border rounded-lg hover:border-blue-500 shadow-sm">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Series</h3>
          <div ref={scrollRef} className="horizontal-scroll gap-6 pb-4">
            {upcomingSeries.map((series, index) => (
              <div key={series.id}
                className="w-[280px] bg-white rounded-xl border shadow hover:shadow-lg transition animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}>

                <div className={`h-32 bg-gradient-to-br ${series.color} flex items-center justify-center`}>
                  <span className="text-5xl">{series.logo}</span>
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-gray-800 text-lg">{series.name}</h4>
                  <p className="text-gray-500 text-sm mb-3">{series.dates}</p>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">{series.teams} Teams</span>
                    <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-200">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tables */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Detailed League Standings</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Group A */}
            <div className="bg-white rounded-xl border shadow animate-slide-left">
              <div className="p-4 border-b bg-gray-100">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Trophy size={18} className="text-blue-600" />
                  Group A
                </h4>
              </div>

              <table className="w-full text-sm">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="p-3 text-left">Pos</th>
                    <th className="p-3 text-left">Team</th>
                    <th className="p-3 text-center">P</th>
                    <th className="p-3 text-center">W</th>
                    <th className="p-3 text-center">L</th>
                    <th className="p-3 text-center">Pts</th>
                    <th className="p-3 text-right">NRR</th>
                  </tr>
                </thead>

                <tbody>
                  {group1Standings.map((team, i) => (
                    <tr key={team.team} className="border-b hover:bg-gray-50 animate-fade-in"
                      style={{ animationDelay: `${i * 0.1}s` }}>
                      <td className="p-3">{team.pos}</td>
                      <td className="p-3 font-medium text-gray-800">{team.team}</td>
                      <td className="p-3 text-center">{team.played}</td>
                      <td className="p-3 text-center text-green-600">{team.won}</td>
                      <td className="p-3 text-center text-red-500">{team.lost}</td>
                      <td className="p-3 text-center font-bold">{team.pts}</td>
                      <td className={`p-3 text-right ${team.nrr.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                        {team.nrr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Group B */}
            <div className="bg-white rounded-xl border shadow animate-slide-right">
              <div className="p-4 border-b bg-gray-100">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Trophy size={18} className="text-blue-600" />
                  Group B
                </h4>
              </div>

              <table className="w-full text-sm">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="p-3 text-left">Pos</th>
                    <th className="p-3 text-left">Team</th>
                    <th className="p-3 text-center">P</th>
                    <th className="p-3 text-center">W</th>
                    <th className="p-3 text-center">L</th>
                    <th className="p-3 text-center">Pts</th>
                    <th className="p-3 text-right">NRR</th>
                  </tr>
                </thead>

                <tbody>
                  {group2Standings.map((team, i) => (
                    <tr key={team.team} className="border-b hover:bg-gray-50 animate-fade-in"
                      style={{ animationDelay: `${i * 0.1}s` }}>
                      <td className="p-3">{team.pos}</td>
                      <td className="p-3 font-medium text-gray-800">{team.team}</td>
                      <td className="p-3 text-center">{team.played}</td>
                      <td className="p-3 text-center text-green-600">{team.won}</td>
                      <td className="p-3 text-center text-red-500">{team.lost}</td>
                      <td className="p-3 text-center font-bold">{team.pts}</td>
                      <td className={`p-3 text-right ${team.nrr.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                        {team.nrr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default SeriesStandings