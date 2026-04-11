// import React, { useState } from 'react'
// import { MessageCircle, ThumbsUp, Share2, Bookmark, MoreHorizontal, Send } from 'lucide-react'

// const CommunitySection = () => {
//   const [pollVotes, setPollVotes] = useState({ option1: 68, option2: 32 })
//   const [hasVoted, setHasVoted] = useState(false)
//   const [newComment, setNewComment] = useState('')
//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       user: 'Fire_hummesenedos',
//       avatar: 'FH',
//       comment: 'What an incredible match! The batting display was absolutely phenomenal. Can\'t wait for the next game! 🏏🔥',
//       time: '2 hours ago',
//       likes: 24,
//     },
//     {
//       id: 2,
//       user: 'CricketFan_99',
//       avatar: 'CF',
//       comment: 'Kohli\'s innings was a masterclass. That cover drive was pure perfection! 👏',
//       time: '1 hour ago',
//       likes: 18,
//     },
//     {
//       id: 3,
//       user: 'SportsLover_23',
//       avatar: 'SL',
//       comment: 'This IPL season has been the most exciting one so far. Every match is a thriller!',
//       time: '30 mins ago',
//       likes: 12,
//     },
//   ])

//   const newsArticles = [
//     {
//       id: 1,
//       title: "The World's Best Cricket Matches: Live & Unmatched",
//       excerpt: "Experience the thrill of international cricket with our comprehensive coverage of the biggest tournaments.",
//       author: 'Chase Hill',
//       time: '3 months ago',
//       image: '🏟️',
//       category: 'Recent News',
//     },
//     {
//       id: 2,
//       title: 'The World of Cricket With a Win: Crew Competition',
//       excerpt: 'Team dynamics and strategies that led to the most memorable victories in cricket history.',
//       author: 'Crickt One',
//       time: '2 months ago',
//       image: '🏆',
//       category: 'Recent News',
//     },
//   ]

//   const handleVote = (option) => {
//     if (!hasVoted) {
//       setPollVotes(prev => ({
//         ...prev,
//         [option]: prev[option] + 1
//       }))
//       setHasVoted(true)
//     }
//   }

//   const handleAddComment = (e) => {
//     e.preventDefault()
//     if (newComment.trim()) {
//       setComments([{
//         id: comments.length + 1,
//         user: 'You',
//         avatar: 'ME',
//         comment: newComment,
//         time: 'Just now',
//         likes: 0,
//       }, ...comments])
//       setNewComment('')
//     }
//   }

//   const totalVotes = pollVotes.option1 + pollVotes.option2

//   return (
//     <section id="community" className="py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-10 animate-slide-up">
//           <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
//             CricStream <span className="text-accent">Community</span>
//           </h2>
//           <p className="text-text-muted">Join the conversation with cricket fans worldwide</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* News Articles - Left Column */}
//           <div className="lg:col-span-2 space-y-6">
//             <h3 className="text-lg font-semibold text-text-secondary mb-4">Recent News</h3>
            
//             {/* Featured Article */}
//             <div className="bg-secondary rounded-xl overflow-hidden border border-border card-glow animate-slide-left">
//               <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
//                 <span className="text-8xl">{newsArticles[0].image}</span>
//               </div>
//               <div className="p-6">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
//                     {newsArticles[0].category}
//                   </span>
//                   <span className="text-text-muted text-sm">{newsArticles[0].time}</span>
//                 </div>
//                 <h4 className="text-xl font-bold text-white mb-2 hover:text-accent transition-colors cursor-pointer">
//                   {newsArticles[0].title}
//                 </h4>
//                 <p className="text-text-secondary mb-4">{newsArticles[0].excerpt}</p>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
//                       {newsArticles[0].author.split(' ').map(n => n[0]).join('')}
//                     </div>
//                     <span className="text-sm text-text-muted">{newsArticles[0].author}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <button className="p-2 text-text-muted hover:text-accent transition-colors">
//                       <Bookmark size={18} />
//                     </button>
//                     <button className="p-2 text-text-muted hover:text-accent transition-colors">
//                       <Share2 size={18} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Secondary Article */}
//             <div className="bg-secondary rounded-xl overflow-hidden border border-border card-glow animate-slide-left stagger-1">
//               <div className="flex flex-col sm:flex-row">
//                 <div className="sm:w-48 h-32 sm:h-auto bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center">
//                   <span className="text-5xl">{newsArticles[1].image}</span>
//                 </div>
//                 <div className="flex-1 p-4">
//                   <div className="flex items-center gap-2 mb-2">
//                     <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
//                       {newsArticles[1].category}
//                     </span>
//                     <span className="text-text-muted text-xs">{newsArticles[1].time}</span>
//                   </div>
//                   <h4 className="font-bold text-white mb-1 hover:text-accent transition-colors cursor-pointer">
//                     {newsArticles[1].title}
//                   </h4>
//                   <p className="text-text-secondary text-sm mb-3">{newsArticles[1].excerpt}</p>
//                   <div className="flex items-center gap-2">
//                     <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
//                       {newsArticles[1].author.split(' ').map(n => n[0]).join('')}
//                     </div>
//                     <span className="text-xs text-text-muted">{newsArticles[1].author}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Comments Section */}
//             <div className="bg-secondary rounded-xl overflow-hidden border border-border animate-slide-up">
//               <div className="p-4 border-b border-border">
//                 <h4 className="font-semibold text-white flex items-center gap-2">
//                   <MessageCircle size={18} className="text-accent" />
//                   Comments ({comments.length})
//                 </h4>
//               </div>
              
//               {/* Add Comment */}
//               <form onSubmit={handleAddComment} className="p-4 border-b border-border">
//                 <div className="flex gap-3">
//                   <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold flex-shrink-0">
//                     ME
//                   </div>
//                   <div className="flex-1 flex gap-2">
//                     <input
//                       type="text"
//                       value={newComment}
//                       onChange={(e) => setNewComment(e.target.value)}
//                       placeholder="Add a comment..."
//                       className="flex-1 px-4 py-2 bg-primary border border-border rounded-lg text-white placeholder-text-muted focus:outline-none focus:border-accent"
//                     />
//                     <button
//                       type="submit"
//                       className="p-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition-colors"
//                     >
//                       <Send size={18} />
//                     </button>
//                   </div>
//                 </div>
//               </form>

//               {/* Comments List */}
//               <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
//                 {comments.map((comment) => (
//                   <div key={comment.id} className="flex gap-3 chat-message">
//                     <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold flex-shrink-0">
//                       {comment.avatar}
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <span className="font-medium text-white text-sm">{comment.user}</span>
//                         <span className="text-xs text-text-muted">{comment.time}</span>
//                       </div>
//                       <p className="text-text-secondary text-sm mb-2">{comment.comment}</p>
//                       <div className="flex items-center gap-4">
//                         <button className="flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors">
//                           <ThumbsUp size={14} />
//                           {comment.likes}
//                         </button>
//                         <button className="text-xs text-text-muted hover:text-accent transition-colors">
//                           Reply
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar - Polls & More */}
//           <div className="space-y-6">
//             {/* Community Poll */}
//             <div className="bg-secondary rounded-xl overflow-hidden border border-border animate-slide-right">
//               <div className="p-4 border-b border-border">
//                 <h4 className="font-semibold text-white">Community Poll</h4>
//               </div>
//               <div className="p-4">
//                 <p className="text-white mb-4">Who will win the IPL 2024?</p>
                
//                 <div className="space-y-3">
//                   <button
//                     onClick={() => handleVote('option1')}
//                     disabled={hasVoted}
//                     className={`w-full text-left p-3 rounded-lg border transition-all ${
//                       hasVoted ? 'cursor-default' : 'hover:border-accent cursor-pointer'
//                     } ${hasVoted && pollVotes.option1 > pollVotes.option2 ? 'border-accent bg-accent/5' : 'border-border'}`}
//                   >
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm text-white">Mumbai Indians</span>
//                       <span className="text-sm text-accent font-bold">
//                         {Math.round((pollVotes.option1 / totalVotes) * 100)}%
//                       </span>
//                     </div>
//                     <div className="h-2 bg-border rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-accent rounded-full poll-bar transition-all duration-500"
//                         style={{ width: `${(pollVotes.option1 / totalVotes) * 100}%` }}
//                       />
//                     </div>
//                     <span className="text-xs text-text-muted mt-1">{pollVotes.option1} votes</span>
//                   </button>

//                   <button
//                     onClick={() => handleVote('option2')}
//                     disabled={hasVoted}
//                     className={`w-full text-left p-3 rounded-lg border transition-all ${
//                       hasVoted ? 'cursor-default' : 'hover:border-accent cursor-pointer'
//                     } ${hasVoted && pollVotes.option2 > pollVotes.option1 ? 'border-accent bg-accent/5' : 'border-border'}`}
//                   >
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm text-white">Chennai Super Kings</span>
//                       <span className="text-sm text-accent font-bold">
//                         {Math.round((pollVotes.option2 / totalVotes) * 100)}%
//                       </span>
//                     </div>
//                     <div className="h-2 bg-border rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-text-muted rounded-full poll-bar transition-all duration-500"
//                         style={{ width: `${(pollVotes.option2 / totalVotes) * 100}%` }}
//                       />
//                     </div>
//                     <span className="text-xs text-text-muted mt-1">{pollVotes.option2} votes</span>
//                   </button>
//                 </div>

//                 {hasVoted && (
//                   <p className="text-xs text-accent text-center mt-3 animate-fade-in">
//                     Thanks for voting! 🎉
//                   </p>
//                 )}

//                 <button className="w-full mt-4 text-center text-sm text-accent hover:underline">
//                   See all polls
//                 </button>
//               </div>
//             </div>

//             {/* Trending Topics */}
//             <div className="bg-secondary rounded-xl overflow-hidden border border-border animate-slide-right stagger-1">
//               <div className="p-4 border-b border-border">
//                 <h4 className="font-semibold text-white">Trending Topics</h4>
//               </div>
//               <div className="p-4 space-y-3">
//                 {['#IPL2024', '#ViratKohli', '#T20WorldCup', '#CricketFever', '#TeamIndia'].map((tag, index) => (
//                   <div
//                     key={tag}
//                     className="flex items-center justify-between py-2 border-b border-border last:border-0 cursor-pointer hover:text-accent transition-colors"
//                   >
//                     <span className="text-sm text-text-secondary">{tag}</span>
//                     <span className="text-xs text-text-muted">{10 - index}k posts</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="bg-secondary rounded-xl overflow-hidden border border-border animate-slide-right stagger-2">
//               <div className="p-4 border-b border-border">
//                 <h4 className="font-semibold text-white">Community Stats</h4>
//               </div>
//               <div className="p-4 grid grid-cols-2 gap-4">
//                 <div className="text-center p-3 bg-primary rounded-lg">
//                   <p className="text-2xl font-bold text-accent">2.5M+</p>
//                   <p className="text-xs text-text-muted">Active Users</p>
//                 </div>
//                 <div className="text-center p-3 bg-primary rounded-lg">
//                   <p className="text-2xl font-bold text-accent">50K+</p>
//                   <p className="text-xs text-text-muted">Daily Posts</p>
//                 </div>
//                 <div className="text-center p-3 bg-primary rounded-lg">
//                   <p className="text-2xl font-bold text-accent">100+</p>
//                   <p className="text-xs text-text-muted">Countries</p>
//                 </div>
//                 <div className="text-center p-3 bg-primary rounded-lg">
//                   <p className="text-2xl font-bold text-accent">24/7</p>
//                   <p className="text-xs text-text-muted">Live Support</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default CommunitySection



import React, { useState } from 'react'
import { MessageCircle, ThumbsUp, Share2, Bookmark, Send } from 'lucide-react'

const CommunitySection = () => {
  const [pollVotes, setPollVotes] = useState({ option1: 68, option2: 32 })
  const [hasVoted, setHasVoted] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Fire_hummesenedos',
      avatar: 'FH',
      comment: 'What an incredible match! The batting display was absolutely phenomenal. Can\'t wait for the next game! 🏏🔥',
      time: '2 hours ago',
      likes: 24,
    },
    {
      id: 2,
      user: 'CricketFan_99',
      avatar: 'CF',
      comment: 'Kohli\'s innings was a masterclass. That cover drive was pure perfection! 👏',
      time: '1 hour ago',
      likes: 18,
    },
    {
      id: 3,
      user: 'SportsLover_23',
      avatar: 'SL',
      comment: 'This IPL season has been the most exciting one so far. Every match is a thriller!',
      time: '30 mins ago',
      likes: 12,
    },
  ])

  const newsArticles = [
    {
      id: 1,
      title: "The World's Best Cricket Matches: Live & Unmatched",
      excerpt: "Experience the thrill of international cricket with our comprehensive coverage of the biggest tournaments.",
      author: 'Chase Hill',
      time: '3 months ago',
      image: '🏟️',
      category: 'Recent News',
    },
    {
      id: 2,
      title: 'The World of Cricket With a Win: Crew Competition',
      excerpt: 'Team dynamics and strategies that led to the most memorable victories in cricket history.',
      author: 'Crickt One',
      time: '2 months ago',
      image: '🏆',
      category: 'Recent News',
    },
  ]

  const handleVote = (option) => {
    if (!hasVoted) {
      setPollVotes(prev => ({
        ...prev,
        [option]: prev[option] + 1
      }))
      setHasVoted(true)
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      setComments([{
        id: comments.length + 1,
        user: 'You',
        avatar: 'ME',
        comment: newComment,
        time: 'Just now',
        likes: 0,
      }, ...comments])
      setNewComment('')
    }
  }

  const totalVotes = pollVotes.option1 + pollVotes.option2

  return (
    <section
      id="community"
      className="py-12 px-4 sm:px-6 lg:px-8 font-[Poppins] bg-gray-50 text-gray-900"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 animate-slide-up">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            CricStream <span className="text-blue-600">Community</span>
          </h2>
          <p className="text-gray-500">Join the conversation with cricket fans worldwide</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent News</h3>

            {/* Featured */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm animate-slide-left">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <span className="text-8xl">{newsArticles[0].image}</span>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                    {newsArticles[0].category}
                  </span>
                  <span className="text-gray-500 text-sm">{newsArticles[0].time}</span>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                  {newsArticles[0].title}
                </h4>

                <p className="text-gray-600 mb-4">{newsArticles[0].excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                      {newsArticles[0].author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-gray-500">{newsArticles[0].author}</span>
                  </div>

                  <div className="flex gap-3">
                    <Bookmark size={18} className="text-gray-400 hover:text-blue-600 cursor-pointer" />
                    <Share2 size={18} className="text-gray-400 hover:text-blue-600 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm animate-slide-up">
              <div className="p-4 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MessageCircle size={18} className="text-blue-600" />
                  Comments ({comments.length})
                </h4>
              </div>

              <form onSubmit={handleAddComment} className="p-4 border-b border-gray-200">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    ME
                  </div>

                  <div className="flex-1 flex gap-2">
                    <input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
                    />
                    <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </form>

              <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {comment.avatar}
                    </div>

                    <div className="flex-1">
                      <div className="flex gap-2 mb-1">
                        <span className="font-medium text-gray-900 text-sm">{comment.user}</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>

                      <p className="text-gray-700 text-sm mb-2">{comment.comment}</p>

                      <div className="flex gap-4">
                        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
                          <ThumbsUp size={14} />
                          {comment.likes}
                        </button>
                        <button className="text-xs text-gray-500 hover:text-blue-600">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* Poll */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm animate-slide-right">
              <div className="p-4 border-b border-gray-200">
                <h4 className="font-semibold text-gray-900">Community Poll</h4>
              </div>

              <div className="p-4">
                <p className="text-gray-900 mb-4">Who will win the IPL 2024?</p>

                {['option1', 'option2'].map((opt, i) => {
                  const name = i === 0 ? 'Mumbai Indians' : 'Chennai Super Kings'
                  const value = pollVotes[opt]

                  return (
                    <button
                      key={opt}
                      onClick={() => handleVote(opt)}
                      disabled={hasVoted}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-500 mb-3"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-900">{name}</span>
                        <span className="text-sm text-blue-600 font-bold">
                          {Math.round((value / totalVotes) * 100)}%
                        </span>
                      </div>

                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600"
                          style={{ width: `${(value / totalVotes) * 100}%` }}
                        />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection