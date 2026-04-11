import React, { useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, MessageSquare, Send, MoreHorizontal } from 'lucide-react'

const LiveMatchDashboard = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Ritesh_sab', message: 'What a shot! 🔥', time: '2m ago', avatar: 'RS' },
    { id: 2, user: 'Prave_Tripathi', message: 'Kohli is on fire today!', time: '1m ago', avatar: 'PT' },
    { id: 3, user: 'Suresh_meh', message: 'This partnership is crucial', time: 'Just now', avatar: 'SM' },
    { id: 4, user: 'Ajay_vk', message: 'Come on India! 🇮🇳', time: 'Just now', avatar: 'AV' },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [activeTab, setActiveTab] = useState('chat')

  const batsmen = [
    { name: 'Virat Kohli', runs: 91, balls: 76, fours: 10, sixes: 2, strikeRate: 119.74, status: 'batting' },
    { name: 'Rohit Sharma', runs: 48, balls: 40, fours: 6, sixes: 1, strikeRate: 120.00, status: 'batting' },
  ]

  const bowler = { name: 'Jofra Archer', overs: 8.2, maidens: 0, runs: 52, wickets: 1, economy: 6.24 }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, {
        id: chatMessages.length + 1,
        user: 'You',
        message: newMessage,
        time: 'Just now',
        avatar: 'ME'
      }])
      setNewMessage('')
    }
  }

  return (
    <section id="matches" className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-green-100 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Live Match Dashboard
          </h2>

          <div className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <span className="text-red-600 text-sm font-medium">LIVE</span>
          </div>
        </div>

        {/* Match Info */}
        <div className="glass rounded-xl p-4 mb-6 animate-slide-up stagger-1 bg-white/80 backdrop-blur border border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-800">IND</span>
              <span className="text-gray-500">vs</span>
              <span className="font-bold text-gray-800">ENG</span>
            </div>
            <div className="text-gray-600 text-sm">
              Ongoing: 1st T-20 • Bhopal Stadium
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-3 animate-slide-left stagger-2">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">

              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Detailed Scorecard</h3>
              </div>

              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gray-800">IND</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-600">245/3</span>
                    <span className="text-gray-500 text-sm ml-2">18.4 ov</span>
                  </div>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>ENG</span>
                  <span>Yet to bat</span>
                </div>
              </div>

              <div className="p-4 border-b border-gray-200">
                <h4 className="text-xs text-gray-500 uppercase mb-3">Batsmen</h4>
                {batsmen.map((b, i) => (
                  <div key={i} className="flex justify-between py-2">
                    <div>
                      <p className={`font-medium ${b.status === 'batting' ? 'text-green-600' : 'text-gray-800'}`}>
                        {b.name} {b.status === 'batting' && '*'}
                      </p>
                      <p className="text-xs text-gray-500">{b.fours}x4, {b.sixes}x6</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{b.runs}</p>
                      <p className="text-xs text-gray-500">{b.balls}b • SR {b.strikeRate}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4">
                <h4 className="text-xs text-gray-500 uppercase mb-3">Bowler</h4>
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{bowler.name}</p>
                    <p className="text-xs text-gray-500">{bowler.overs} overs</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{bowler.wickets}/{bowler.runs}</p>
                    <p className="text-xs text-gray-500">Econ {bowler.economy}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VIDEO */}
          <div className="lg:col-span-6 animate-slide-up stagger-3">
            <div className="relative bg-gray-200 rounded-xl overflow-hidden border border-gray-200 aspect-video">

              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center cursor-pointer hover:bg-green-200 transition"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause size={32} className="text-green-600" /> : <Play size={32} className="text-green-600 ml-1" />}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur p-4">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <button onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause /> : <Play />}
                    </button>
                    <button onClick={() => setIsMuted(!isMuted)}>
                      {isMuted ? <VolumeX /> : <Volume2 />}
                    </button>
                  </div>
                  <Maximize />
                </div>
              </div>

              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                LIVE
              </div>
            </div>

            {/* MATCHUP */}
            <div className="mt-4 bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-sm text-gray-500 mb-4 text-center">Batsman Matchup</h3>
              <div className="flex justify-between items-center">

                <div>
                  <p className="font-medium text-gray-800">V. Kohli</p>
                  <p className="text-xl font-bold text-green-600">91*</p>
                </div>

                <span className="text-gray-500 font-bold">VS</span>

                <div className="text-right">
                  <p className="font-medium text-gray-800">R. Sharma</p>
                  <p className="text-xl font-bold text-green-600">48*</p>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-3 animate-slide-right stagger-4">
            <div className="bg-white rounded-xl border border-gray-200 h-full">

              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-3 text-sm ${activeTab === 'chat' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('polls')}
                  className={`flex-1 py-3 text-sm ${activeTab === 'polls' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                >
                  Polls
                </button>
              </div>

              {activeTab === 'chat' && (
                <div className="flex flex-col h-[400px]">
                  <div className="flex-1 p-4 overflow-y-auto space-y-3">
                    {chatMessages.map(msg => (
                      <div key={msg.id} className="flex gap-3">
                        <div className="w-8 h-8 bg-green-100 text-green-600 flex items-center justify-center rounded-full text-xs font-bold">
                          {msg.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{msg.user}</p>
                          <p className="text-sm text-gray-600">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex gap-2">
                    <input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 border rounded-lg px-3 py-2 text-sm"
                      placeholder="Type message..."
                    />
                    <button className="bg-green-600 text-white p-2 rounded-lg">
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'polls' && (
                <div className="p-4">
                  <p className="font-medium text-gray-800 mb-3">Who will win?</p>
                  <div className="h-2 bg-gray-200 rounded mb-2">
                    <div className="h-2 bg-green-500 w-[68%] rounded"></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-gray-400 w-[32%] rounded"></div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default LiveMatchDashboard