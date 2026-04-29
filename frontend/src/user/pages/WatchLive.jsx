import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import UserSidebar from "../components/UserSidebar";
// import Hls from "hls.js";
// import { useRef } from "react";
import ReactPlayer from "react-player";

const socket = io(
  "http://localhost:4000",
  {
    transports: ["websocket"]
  }
);

const WatchLive = () => {
  const { id } = useParams();
  // const videoRef = useRef(null);

  const [match, setMatch] = useState(null);
  const [balls, setBalls] = useState([]);

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [celebration, setCelebration] =
    useState("");

  const [poll, setPoll] = useState({
    teamA: 0,
    teamB: 0
  });

  const [viewers, setViewers] =
    useState(12450);

  const [typingUser, setTypingUser] =
    useState("");

  const [reactions, setReactions] =
    useState({
      heart: 0,
      fire: 0,
      wow: 0,
      clap: 0
    });

  const [
    floatingReactions,
    setFloatingReactions
  ] = useState([]);

//  useEffect(() => {
//   // const video =
//   //   videoRef.current;

//   const streamUrl =
//     "http://localhost:8000/live/match/index.m3u8";

//   if (
//     Hls.isSupported()
//   ) {
//     const hls =
//       new Hls({
//         maxBufferLength: 30
//       });

//     hls.loadSource(
//       streamUrl
//     );

//     hls.attachMedia(
//       video
//     );

//     hls.on(
//       Hls.Events.MANIFEST_PARSED,
//       () => {
//         video.play()
//           .catch(() => {});
//       }
//     );

//   } else if (
//     video.canPlayType(
//       "application/vnd.apple.mpegurl"
//     )
//   ) {
//     video.src =
//       streamUrl;

//     video.addEventListener(
//       "loadedmetadata",
//       () => {
//         video.play()
//           .catch(() => {});
//       }
//     );
//   }
// }, []);
 
  useEffect(() => {

    
    fetchAll();

    socket.emit("joinMatch", id);

    socket.on(
      "receiveMessage",
      (data) => {
        setChat((prev) => [
          ...prev,
          data
        ]);
      }
    );

    socket.on(
      "showTyping",
      (name) => {
        setTypingUser(name);

        setTimeout(() => {
          setTypingUser("");
        }, 2000);
      }
    );

    socket.on(
      "receiveReaction",
      ({ counts, type }) => {
        setReactions(counts);

        const emojiMap = {
          heart: "❤️",
          fire: "🔥",
          wow: "😮",
          clap: "👏"
        };

        const newId =
          Date.now();

        setFloatingReactions(
          (prev) => [
            ...prev,
            {
              id: newId,
              emoji:
                emojiMap[type],
              left:
                Math.floor(
                  Math.random() *
                    70
                ) + 15
            }
          ]
        );

        setTimeout(() => {
          setFloatingReactions(
            (prev) =>
              prev.filter(
                (item) =>
                  item.id !==
                  newId
              )
          );
        }, 2500);
      }
    );

    socket.on(
      "viewerUpdate",
      (count) => {
        setViewers(count);
      }
    );

    const interval =
      setInterval(() => {
        fetchMatch();
        fetchBalls();
        fetchPoll();
        fetchReactions();
      }, 5000);

    return () => {
      clearInterval(interval);

      socket.off(
        "receiveMessage"
      );

      socket.off(
        "receiveReaction"
      );

      socket.off(
        "viewerUpdate"
      );

      socket.off(
        "showTyping"
      );
    };
  }, [id]);

  const fetchAll = () => {
    fetchMatch();
    fetchBalls();
    fetchMessages();
    fetchPoll();
    fetchReactions();
  };

  const fetchMatch =
    async () => {
      try {
        const res =
          await axios.get(
            `http://localhost:4000/api/match/${id}`
          );

        setMatch(
          res.data
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  const fetchBalls =
    async () => {
      try {
        const res =
          await axios.get(
            `http://localhost:4000/api/match/balls/${id}`
          );

        const latest =
          res.data.reverse();

        setBalls(latest);

        if (
          latest.length > 0
        ) {
          const ball =
            latest[0];

          if (
            ball.wicketType
          ) {
            showCelebration(
              "🔥 WICKET 🔥"
            );
          } else if (
            ball.runs === 6
          ) {
            showCelebration(
              "💥 SIX 💥"
            );
          } else if (
            ball.runs === 4
          ) {
            showCelebration(
              "⚡ FOUR ⚡"
            );
          }
        }
      } catch (error) {
        console.log(
          error
        );
      }
    };

  const showCelebration = (
    text
  ) => {
    setCelebration(text);

    setTimeout(() => {
      setCelebration("");
    }, 2200);
  };

  const fetchMessages =
    async () => {
      try {
        const res =
          await axios.get(
            `http://localhost:4000/api/live/chat/${id}`
          );

        setChat(
          res.data
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  const sendMessage =
    async () => {
      if (
        !message.trim()
      )
        return;

      const msgData = {
        matchId: id,
        username:
          "Priyanka",
        message
      };

      socket.emit(
        "sendMessage",
        msgData
      );

      try {
        await axios.post(
          "http://localhost:4000/api/live/chat",
          msgData
        );
      } catch (error) {
        console.log(
          error
        );
      }

      setMessage("");
    };

  const fetchPoll =
    async () => {
      try {
        const res =
          await axios.get(
            `http://localhost:4000/api/live/poll/${id}`
          );

        setPoll(
          res.data
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  const votePoll =
    async (
      team
    ) => {
      const alreadyVoted =
        localStorage.getItem(
          `poll_${id}`
        );

      if (
        alreadyVoted
      ) {
        alert(
          "Already voted"
        );
        return;
      }

      try {
        await axios.post(
          "http://localhost:4000/api/live/poll",
          {
            matchId: id,
            team
          }
        );

        localStorage.setItem(
          `poll_${id}`,
          "done"
        );

        fetchPoll();
      } catch (error) {
        console.log(
          error
        );
      }
    };

  const fetchReactions =
    async () => {
      try {
        const res =
          await axios.get(
            `http://localhost:4000/api/reaction/${id}`
          );

        setReactions(
          res.data
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  const handleReaction =
    (type) => {
      socket.emit(
        "sendReaction",
        {
          matchId: id,
          type
        }
      );

      const emojiMap = {
        heart: "❤️",
        fire: "🔥",
        wow: "😮",
        clap: "👏"
      };

      const burstCount =
        Math.floor(
          Math.random() *
            3
        ) + 2;

      for (
        let i = 0;
        i < burstCount;
        i++
      ) {
        const newId =
          Date.now() + i;

        setFloatingReactions(
          (prev) => [
            ...prev,
            {
              id: newId,
              emoji:
                emojiMap[type],
              left:
                Math.floor(
                  Math.random() *
                    80
                ) + 10
            }
          ]
        );

        setTimeout(() => {
          setFloatingReactions(
            (prev) =>
              prev.filter(
                (item) =>
                  item.id !==
                  newId
              )
          );
        }, 2500);
      }
    };

  if (!match)
    return null;

  const totalVotes =
    poll.teamA +
    poll.teamB;

  const team1Percent =
    totalVotes === 0
      ? 0
      : Math.round(
          (poll.teamA /
            totalVotes) *
            100
        );

  const team2Percent =
    totalVotes === 0
      ? 0
      : 100 -
        team1Percent;

  const winA =
    match.score >
    match.target
      ? 70
      : 45;

  const winB =
    100 - winA;

  return (
    <>
      {celebration && (
        <div className="celebration-popup">
          {
            celebration
          }
        </div>
      )}

      <div className="flex min-h-screen bg-[#0f172a] text-white">

        <UserSidebar />

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">

          {/* Main */}
          <div className="lg:col-span-3">

            <h1 className="text-3xl font-bold mb-6">
              🔴{" "}
              {
                match.teamA
              }{" "}
              vs{" "}
              {
                match.teamB
              }
            </h1>

            <div className="bg-[#1e293b] p-6 rounded-2xl">

              <p className="text-green-400 text-xl">
                {
                  match.score
                }
                /
                {
                  match.wickets
                }
              </p>

              <p className="mt-1">
                Overs:{" "}
                {
                  match.balls
                }
              </p>

              <div className="mt-5 relative overflow-hidden">

<div className="rounded-xl overflow-hidden bg-black h-[65vh]">
  <ReactPlayer
    url="http://192.168.1.12:8000/live/match/index.m3u8"
    playing={true}
    controls={true}
    muted={true}
    width="100%"
    height="100%"
    playsinline={true}
  />
</div>


                {floatingReactions.map(
                  (
                    item
                  ) => (
                    <span
                      key={
                        item.id
                      }
                      className="absolute text-4xl pointer-events-none floating-emoji z-50"
                      style={{
                        left: `${item.left}%`,
                        bottom:
                          "20px"
                      }}
                    >
                      {
                        item.emoji
                      }
                    </span>
                  )
                )}

              </div>

              {/* Commentary */}
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-3">
                  📝
                  Commentary
                </h2>

                <div className="space-y-2 max-h-[250px] overflow-y-auto">

                  {balls.map(
                    (
                      ball
                    ) => (
                      <div
                        key={
                          ball._id
                        }
                        className="bg-[#0f172a] p-3 rounded-xl"
                      >
                        <span className="text-yellow-400 font-bold">
                          {
                            ball.over
                          }
                          .
                          {
                            ball.ball
                          }
                        </span>{" "}
                        -{" "}
                        {
                          ball.runs
                        }{" "}
                        Run
                        {ball.wicketType &&
                          " | WICKET 🔥"}
                      </div>
                    )
                  )}

                </div>
              </div>

            </div>

          </div>

          {/* Right Panel */}
          <div className="space-y-5">

            {/* Viewers */}
            <div className="bg-[#1e293b] p-5 rounded-2xl">
              <h2 className="font-bold mb-3">
                👀 Live Watching
              </h2>

              <p className="text-3xl text-green-400 font-bold">
                {
                  viewers
                }
              </p>
            </div>

            {/* Win Probability */}
            <div className="bg-[#1e293b] p-5 rounded-2xl">
              <h2 className="font-bold mb-3">
                📊 Win Probability
              </h2>

              <p className="mb-2 text-sm">
                {
                  match.teamA
                }
                :{" "}
                {winA}%
              </p>

              <div className="w-full bg-gray-700 h-3 rounded-full">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${winA}%`
                  }}
                ></div>
              </div>

              <p className="mt-3 text-sm">
                {
                  match.teamB
                }
                :{" "}
                {winB}%
              </p>
            </div>

            {/* Poll */}
            <div className="bg-[#1e293b] p-5 rounded-2xl">
              <h2 className="font-bold mb-3">
                🗳 Poll
              </h2>

              <button
                onClick={() =>
                  votePoll(
                    "A"
                  )
                }
                className="w-full bg-blue-500 py-2 rounded-lg mb-2"
              >
                {
                  match.teamA
                }
              </button>

              <p className="mb-3 text-sm">
                {
                  poll.teamA
                }{" "}
                Votes (
                {
                  team1Percent
                }
                %)
              </p>

              <button
                onClick={() =>
                  votePoll(
                    "B"
                  )
                }
                className="w-full bg-pink-500 py-2 rounded-lg mb-2"
              >
                {
                  match.teamB
                }
              </button>

              <p className="text-sm">
                {
                  poll.teamB
                }{" "}
                Votes (
                {
                  team2Percent
                }
                %)
              </p>
            </div>

            {/* Reactions */}
            <div className="bg-[#1e293b] p-5 rounded-2xl">

              <h2 className="font-bold mb-3">
                🔥 Reactions
              </h2>

              <div className="grid grid-cols-2 gap-3">

                <button
                  onClick={() =>
                    handleReaction(
                      "heart"
                    )
                  }
                  className="bg-[#0f172a] py-2 rounded-lg"
                >
                  ❤️{" "}
                  {
                    reactions.heart
                  }
                </button>

                <button
                  onClick={() =>
                    handleReaction(
                      "fire"
                    )
                  }
                  className="bg-[#0f172a] py-2 rounded-lg"
                >
                  🔥{" "}
                  {
                    reactions.fire
                  }
                </button>

                <button
                  onClick={() =>
                    handleReaction(
                      "wow"
                    )
                  }
                  className="bg-[#0f172a] py-2 rounded-lg"
                >
                  😮{" "}
                  {
                    reactions.wow
                  }
                </button>

                <button
                  onClick={() =>
                    handleReaction(
                      "clap"
                    )
                  }
                  className="bg-[#0f172a] py-2 rounded-lg"
                >
                  👏{" "}
                  {
                    reactions.clap
                  }
                </button>

              </div>

            </div>

            {/* Chat */}
            <div className="bg-[#1e293b] p-5 rounded-2xl overflow-hidden">

              <h2 className="font-bold mb-3">
                💬 Live Chat
              </h2>

              <div className="h-56 overflow-y-auto space-y-2 mb-3">

                {chat.map(
                  (
                    msg,
                    i
                  ) => (
                    <div
                      key={
                        i
                      }
                      className="bg-[#0f172a] p-2 rounded-lg"
                    >
                      <p className="text-green-400 text-sm">
                        {
                          msg.username
                        }
                      </p>

                      <p>
                        {
                          msg.message
                        }
                      </p>
                    </div>
                  )
                )}

              </div>

              {typingUser && (
                <p className="text-sm text-gray-400 mb-2 animate-pulse">
                  {
                    typingUser
                  }{" "}
                  is typing...
                </p>
              )}

              <div className="flex items-center gap-2 w-full">

                <input
                  value={
                    message
                  }
                  onChange={(
                    e
                  ) => {
                    setMessage(
                      e
                        .target
                        .value
                    );

                    socket.emit(
                      "typing",
                      {
                        matchId:
                          id,
                        username:
                          "Priyanka"
                      }
                    );
                  }}
                  onKeyDown={(
                    e
                  ) =>
                    e.key ===
                      "Enter" &&
                    sendMessage()
                  }
                  placeholder="Type message..."
                  className="flex-1 min-w-0 px-3 py-2 bg-[#0f172a] rounded-lg outline-none text-sm"
                />

                <button
                  onClick={
                    sendMessage
                  }
                  className="w-10 h-10 shrink-0 bg-green-500 rounded-full flex items-center justify-center text-lg"
                >
                  ➤
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default WatchLive;