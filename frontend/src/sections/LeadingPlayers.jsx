import React, { useState } from 'react'
import { TrendingUp, Target, Zap } from 'lucide-react'

const LeadingPlayers = () => {
  const [hoveredPlayer, setHoveredPlayer] = useState(null)

  const mostRuns = [
    { rank: 1, name: 'Virat Kohli', team: 'RCB', runs: 741, matches: 15, average: 61.75, strikeRate: 154.69, highest: 113 },
    { rank: 2, name: 'Ruturaj Gaikwad', team: 'CSK', runs: 583, matches: 14, average: 48.58, strikeRate: 141.16, highest: 108 },
    { rank: 3, name: 'Travis Head', team: 'SRH', runs: 567, matches: 15, average: 40.50, strikeRate: 191.55, highest: 102 },
    { rank: 4, name: 'Sanju Samson', team: 'RR', runs: 531, matches: 15, average: 48.27, strikeRate: 153.46, highest: 86 },
    { rank: 5, name: 'KL Rahul', team: 'LSG', runs: 520, matches: 14, average: 37.14, strikeRate: 136.12, highest: 82 },
  ]

  const mostWickets = [
    { rank: 1, name: 'Jasprit Bumrah', team: 'MI', wickets: 20, matches: 13, average: 16.80, economy: 6.48, best: '5/21' },
    { rank: 2, name: 'Harshal Patel', team: 'PBKS', wickets: 24, matches: 14, average: 19.87, economy: 9.73, best: '3/31' },
    { rank: 3, name: 'Varun Chakaravarthy', team: 'KKR', wickets: 21, matches: 15, average: 19.14, economy: 8.18, best: '3/16' },
    { rank: 4, name: 'T Natarajan', team: 'SRH', wickets: 19, matches: 14, average: 24.47, economy: 9.05, best: '4/19' },
    { rank: 5, name: 'Arshdeep Singh', team: 'PBKS', wickets: 19, matches: 14, average: 26.47, economy: 10.01, best: '4/29' },
  ]

  const mostSixes = [
    { rank: 1, name: 'Abhishek Sharma', team: 'SRH', sixes: 42, matches: 16, fours: 41, strikeRate: 204.13 },
    { rank: 2, name: 'Heinrich Klaasen', team: 'SRH', sixes: 38, matches: 15, fours: 26, strikeRate: 171.08 },
    { rank: 3, name: 'Travis Head', team: 'SRH', sixes: 32, matches: 15, fours: 64, strikeRate: 191.55 },
    { rank: 4, name: 'Jake Fraser-McGurk', team: 'DC', sixes: 28, matches: 9, fours: 24, strikeRate: 234.04 },
    { rank: 5, name: 'Nicholas Pooran', team: 'LSG', sixes: 26, matches: 14, fours: 30, strikeRate: 178.23 },
  ]

  const getTeamColor = (team) => {
    const colors = {
      'RCB': 'bg-red-500',
      'CSK': 'bg-yellow-400',
      'MI': 'bg-blue-500',
      'SRH': 'bg-orange-500',
      'KKR': 'bg-purple-500',
      'RR': 'bg-pink-500',
      'DC': 'bg-blue-400',
      'PBKS': 'bg-red-400',
      'LSG': 'bg-cyan-500',
      'GT': 'bg-indigo-500',
    }
    return colors[team] || 'bg-gray-400'
  }

  const StatCard = ({ title, icon: Icon, data, statKey, statLabel }) => (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm animate-slide-up">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
          <Icon size={18} className="text-green-600" />
          {title}
        </h4>
      </div>

      <div className="p-4 space-y-3">
        {data.map((player, index) => (
          <div
            key={player.name}
            className="relative flex items-center gap-3 p-3 bg-gray-50 rounded-lg table-row-hover cursor-pointer transition-all duration-300 hover:bg-gray-100"
            onMouseEnter={() => setHoveredPlayer(`${title}-${player.name}`)}
            onMouseLeave={() => setHoveredPlayer(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Rank */}
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              player.rank === 1 ? 'bg-green-600 text-white' :
              player.rank === 2 ? 'bg-yellow-400 text-black' :
              player.rank === 3 ? 'bg-orange-400 text-white' :
              'bg-gray-300 text-gray-700'
            }`}>
              {player.rank}
            </span>

            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full ${getTeamColor(player.team)} flex items-center justify-center text-white text-xs font-bold`}>
              {player.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">{player.name}</p>
              <p className="text-xs text-gray-500">{player.team} • {player.matches} matches</p>
            </div>

            {/* Stats */}
            <div className="text-right">
              <p className="text-xl font-bold text-green-600 number-roll">{player[statKey]}</p>
              <p className="text-xs text-gray-500">{statLabel}</p>
            </div>

            {/* Tooltip */}
            {hoveredPlayer === `${title}-${player.name}` && (
              <div className="absolute right-0 top-full mt-2 z-10 bg-white border border-gray-200 rounded-lg p-3 shadow-lg animate-fade-in">
                <p className="font-medium text-gray-800 text-sm">{player.name}</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                  <div>
                    <span className="text-gray-500">Avg:</span>
                    <span className="text-gray-800 ml-1">{player.average || '-'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">SR:</span>
                    <span className="text-gray-800 ml-1">{player.strikeRate || '-'}</span>
                  </div>
                  {player.highest && (
                    <div>
                      <span className="text-gray-500">HS:</span>
                      <span className="text-gray-800 ml-1">{player.highest}</span>
                    </div>
                  )}
                  {player.best && (
                    <div>
                      <span className="text-gray-500">BB:</span>
                      <span className="text-gray-800 ml-1">{player.best}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="stats" className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full">

        {/* Header */}
        <div className="text-center mb-10 animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Leading <span className="text-green-600">Players</span>
          </h2>
          <p className="text-gray-500">Top performers of the season</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Most Runs" icon={TrendingUp} data={mostRuns} statKey="runs" statLabel="Runs" />
          <StatCard title="Most Wickets" icon={Target} data={mostWickets} statKey="wickets" statLabel="Wickets" />
          <StatCard title="Most Sixes" icon={Zap} data={mostSixes} statKey="sixes" statLabel="Sixes" />
        </div>

        {/* Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm">
            View Full Statistics
          </button>
        </div>

      </div>
    </section>
  )
}

export default LeadingPlayers