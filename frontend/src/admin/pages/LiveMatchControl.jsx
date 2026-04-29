import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { ArrowLeft, Activity } from "lucide-react";

const LiveMatchControl = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState(null);
  const [players, setPlayers] = useState([]);

  const [battingTeam, setBattingTeam] = useState("");
  const [bowlingTeam, setBowlingTeam] = useState("");

  const [striker, setStriker] = useState("");
  const [nonStriker, setNonStriker] = useState("");
  const [bowler, setBowler] = useState("");

  const [score, setScore] = useState({ runs: 0, wickets: 0, balls: 0 });
  const [history, setHistory] = useState([]);

  const [outPlayers, setOutPlayers] = useState([]);
  const [outType, setOutType] = useState("");

  const [batsmanStats, setBatsmanStats] = useState({});
  const [bowlerStats, setBowlerStats] = useState({});

  const [innings, setInnings] = useState(1);
const [target, setTarget] = useState(0);
const [firstInningsScore, setFirstInningsScore] = useState(0);
  const [lastBowler, setLastBowler] = useState("");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    fetch(`https://cricket-landing.onrender.com/api/match/${id}`)
      .then(res => res.json())
      .then(setMatch);

    fetch("https://cricket-landing.onrender.com/api/player/all")
      .then(res => res.json())
      .then(data => setPlayers(data.players));
  }, [id]);

  // 
  // 🔥 NEW ADDITION (RESTORE LOGIC)
 useEffect(() => {
  // ⚠️ ensure players & match loaded
  if (!players.length || !match) return;

  fetch(`https://cricket-landing.onrender.com/api/match/balls/${id}`)
    .then(res => res.json())
    .then(data => {

      let runs = 0;
      let wickets = 0;
      let balls = 0;

      let historyArr = [];
      let batsman = {};
      let bowler = {};

      data.forEach(b => {

        runs += b.runs || 0;

        if (!b.extraType) balls++;

        if (b.wicketType) wickets++;

        if (b.wicketType) {
          historyArr.push(`W(${b.wicketType})`);
        } else if (b.extraType === "wide") {
          historyArr.push("Wd");
        } else if (b.extraType === "no-ball") {
          historyArr.push("Nb");
        } else {
          historyArr.push(b.runs);
        }

        if (!batsman[b.striker]) {
          batsman[b.striker] = { runs: 0, balls: 0, fours: 0, sixes: 0 };
        }

        batsman[b.striker].runs += b.runs || 0;
        if (!b.extraType) batsman[b.striker].balls++;

        if (b.runs === 4) batsman[b.striker].fours++;
        if (b.runs === 6) batsman[b.striker].sixes++;

        if (!bowler[b.bowler]) {
          bowler[b.bowler] = { runs: 0, balls: 0, wickets: 0 };
        }

        bowler[b.bowler].runs += b.runs || 0;
        if (!b.extraType) bowler[b.bowler].balls++;
        if (b.wicketType) bowler[b.bowler].wickets++;
      });

      setScore({ runs, wickets, balls });
      setHistory(historyArr);
      setBatsmanStats(batsman);
      setBowlerStats(bowler);

      // 🔥 PERFECT RESTORE
      if (data.length > 0) {

        let strikerId = null;
        let nonStrikerId = null;


        let validBalls = 0; // 🔥 ADD (loop ke bahar)
        data.forEach((b, index) => {

          if (index === 0) {
            strikerId = b.striker;
          }

          if (!nonStrikerId && b.striker !== strikerId) {
            nonStrikerId = b.striker;
          }

          if (b.wicketType) {
            strikerId = b.striker;
          }

          if (!b.extraType) {
            validBalls++; // 🔥 ADD

            if (b.runs % 2 !== 0) {
              [strikerId, nonStrikerId] = [nonStrikerId, strikerId];
            }

            // const ballNum = index + 1;
            if (validBalls % 6 === 0) {
              [strikerId, nonStrikerId] = [nonStrikerId, strikerId];
            }
          }
        });

        setStriker(strikerId || "");
        setNonStriker(nonStrikerId || "");

        const lastBall = data[data.length - 1];
        setBowler(lastBall.bowler);

        const strikerPlayer = players.find(p => p._id === strikerId);

        if (strikerPlayer) {
          setBattingTeam(strikerPlayer.team);
          setBowlingTeam(
            strikerPlayer.team === match.teamA ? match.teamB : match.teamA
          );
        }
      }

    });
}, [id, players, match]);
  // 

  const battingPlayers = players.filter(
    p => p.team === battingTeam && !outPlayers.includes(p._id)
  );

  const bowlingPlayers = players.filter(
    p => p.team === bowlingTeam
  );

  const getOvers = () => {
    const over = Math.floor(score.balls / 6);
    const ball = score.balls % 6;
    return `${over}.${ball}`;
  };

  const runRate = score.balls > 0 
    ? (score.runs / (score.balls / 6)).toFixed(2)
    : 0;

  // 🔥 ONLY CHANGE: async + API CALL ADDED
  const update = async (type, value = 0) => {

    if (match?.status === "completed") {
  alert("Match already completed ❌");
  return;
}

    if (match?.status !== "live") {
  alert("Match is not live!");
  return;
}

    if (!battingTeam) {
      alert("Select batting team first");
      return;
    }

    if (!striker || !nonStriker || !bowler) {
      alert("Select players first");
      return;
    }

    let newScore = { ...score };

    let currentStriker = striker;
    let currentNonStriker = nonStriker;

    if (type === "run") {
      newScore.runs += value;
      newScore.balls += 1;
      setHistory(prev => [...prev, value]);

      setBatsmanStats(prev => {
        const data = { ...prev };
        if (!data[striker]) {
          data[striker] = { runs: 0, balls: 0, fours: 0, sixes: 0 };
        }
        data[striker].runs += value;
        data[striker].balls += 1;
        if (value === 4) data[striker].fours += 1;
        if (value === 6) data[striker].sixes += 1;
        return data;
      });

      setBowlerStats(prev => {
        const data = { ...prev };
        if (!data[bowler]) {
          data[bowler] = { balls: 0, runs: 0, wickets: 0 };
        }
        data[bowler].runs += value;
        data[bowler].balls += 1;
        return data;
      });

      if (value % 2 !== 0) {
        [currentStriker, currentNonStriker] = [currentNonStriker, currentStriker];
      }
    }

    if (type === "wicket") {
      newScore.wickets += 1;
      newScore.balls += 1;

      const outPlayerName = players.find(p => p._id === striker)?.name;

      setHistory(prev => [
        ...prev,
        `${outPlayerName} W(${outType || "Out"})`
      ]);

      setBowlerStats(prev => {
        const data = { ...prev };
        if (!data[bowler]) {
          data[bowler] = { balls: 0, runs: 0, wickets: 0 };
        }
        data[bowler].wickets += 1;
        data[bowler].balls += 1;
        return data;
      });

      setOutPlayers(prev => [...prev, striker]);
      setStriker("");
      setOutType("");
    }

    if (type === "wide" || type === "no-ball") {
      newScore.runs += 1;

      setBowlerStats(prev => {
        const data = { ...prev };
        if (!data[bowler]) {
          data[bowler] = { balls: 0, runs: 0, wickets: 0 };
        }
        data[bowler].runs += 1;
        return data;
      });

      setHistory(prev => [...prev, type === "wide" ? "Wd" : "Nb"]);
    }

    if (type !== "wide" && type !== "no-ball") {
      if (newScore.balls % 6 === 0) {
        [currentStriker, currentNonStriker] = [currentNonStriker, currentStriker];
         // 🔥 track last bowler
        setLastBowler(bowler);

         // 🔥 force new bowler select
    setBowler("");

    alert("Over completed! Select a new bowler.");
      }
    }

    setStriker(currentStriker);
    setNonStriker(currentNonStriker);
    setScore(newScore);

 // 🔥 INNINGS SYSTEM
const MAX_BALLS = 120;

if (newScore.wickets >= 10 || newScore.balls >= MAX_BALLS) {

  // 🟢 FIRST INNINGS END
  if (innings === 1) {

    const firstScore = newScore.runs;

    alert("1st Innings Completed 🏏");
    setFirstInningsScore(firstScore); // 🔥 ADD THIS
    setTarget(firstScore + 1);
    setInnings(2);

    // reset score
    setScore({ runs: 0, wickets: 0, balls: 0 });
    setHistory([]);
    setBatsmanStats({});
    setBowlerStats({});
    setOutPlayers([]);

    // switch teams
    setBattingTeam(prev =>
      prev === match.teamA ? match.teamB : match.teamA
    );

    setBowlingTeam(prev =>
      prev === match.teamA ? match.teamB : match.teamA
    );

    setStriker("");
    setNonStriker("");
    setBowler("");

    return;
  }

  // 🔴 SECOND INNINGS END
  // 🔴 SECOND INNINGS END (WINNER LOGIC)
if (innings === 2) {

  let result = "";

  // 🟢 CHASE SUCCESS
  if (newScore.runs >= target) {
    const wicketsLeft = 10 - newScore.wickets;
    result = `${battingTeam} won by ${wicketsLeft} wickets 🎉`;
  }

  // 🔴 DEFEND SUCCESS
  else {
    const runsDiff = firstInningsScore - newScore.runs;
    result = `${bowlingTeam} won by ${runsDiff} runs 🏆`;
  }

  alert(result);
  setWinner(result);

  // status update
  await fetch(`https://cricket-landing.onrender.com/api/match/status/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status: "completed" })
  });

  setMatch(prev => ({
    ...prev,
    status: "completed"
  }));
}
}

    // ✅🔥 ONLY ADDITION
    try {
      await fetch("https://cricket-landing.onrender.com/api/match/ball", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          matchId: id,
          striker,
          bowler,
          runs: type === "run" ? value : 0,
          extraType:
            type === "wide" ? "wide" :
            type === "no-ball" ? "no-ball" : null,
          wicketType: type === "wicket" ? outType : null,
          balls: newScore.balls
        })
      });
    } catch (err) {
      console.log("API error:", err);
    }
  };

  const undo = () => {
    let last = history[history.length - 1];
    if (!last) return;

    let newScore = { ...score };

    if (typeof last === "number") {
      newScore.runs -= last;
      newScore.balls -= 1;
    } else if (last.includes("W(")) {
      newScore.wickets -= 1;
      newScore.balls -= 1;
    } else if (last === "Wd" || last === "Nb") {
      newScore.runs -= 1;
    }

    setHistory(prev => prev.slice(0, -1));
    setScore(newScore);
  };

  if (!match) return <p className="text-center mt-10">Loading...</p>;

  return (
   <AdminLayout>

      {/* HEADER */}
      <div className="flex justify-between mb-6 items-center">
        <div className="flex gap-3 items-center">
          <button onClick={() => navigate(-1)} className="p-2 bg-gray-100 rounded">
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Activity className="text-red-500" />
              Live Match Control
            </h1>
            <p className="text-gray-500 text-sm">
              {match.teamA} vs {match.teamB}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-red-600 font-semibold">
          <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          LIVE
        </div>

        
      </div>

      {/* TEAM SELECT */}
      <div className="grid grid-cols-2 gap-4 mb-4">

        <select
          value={battingTeam}
          onChange={(e) => {
            setBattingTeam(e.target.value);
            setBowlingTeam(
              e.target.value === match.teamA ? match.teamB : match.teamA
            );
          }}
          className="p-3 border rounded bg-white text-black"
        >
          <option value="">Select Batting Team</option>
          <option value={match.teamA}>{match.teamA}</option>
          <option value={match.teamB}>{match.teamB}</option>
        </select>

        <input
          value={bowlingTeam}
          readOnly
          className="p-3 border rounded bg-gray-200 text-black font-semibold"
        />
      </div>

      {/* OUT TYPE */}
      <select
        value={outType}
        onChange={(e) => setOutType(e.target.value)}
        className="p-3 border rounded bg-white text-black mb-4"
      >
        <option value="">Select Out Type</option>
        <option value="Bowled">Bowled</option>
        <option value="Caught">Caught</option>
        <option value="LBW">LBW</option>
        <option value="Run Out">Run Out</option>
        <option value="Stumped">Stumped</option>
      </select>

      {/* SCORE */}
      <div className="bg-red-500 text-white p-6 rounded text-center mb-6">
        <h2 className="text-3xl font-bold">{score.runs}/{score.wickets}</h2>
        <p>Overs: {getOvers()}</p>
        <p>Run Rate: {runRate}</p>
        {/* 🔥 ADD THIS */}
  {innings === 2 && (
    <p className="font-semibold mt-2">
      Target: {target}
    </p>
  )}
   {/* 🔥 ADD THIS */}
  {winner && (
    <p className="font-bold mt-3 text-yellow-200 text-lg">
      {winner}
    </p>
  )}
      </div>

      {/* CURRENT PLAYERS */}
      <div className="flex justify-center gap-6 mb-4 text-sm font-semibold">
        <p>🟢 Striker: {players.find(p => p._id === striker)?.name || "-"}</p>
        <p>⚪ Non-Striker: {players.find(p => p._id === nonStriker)?.name || "-"}</p>
        <p>🔵 Bowler: {players.find(p => p._id === bowler)?.name || "-"}</p>
      </div>

      {/* PLAYERS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <select value={striker} onChange={(e)=>setStriker(e.target.value)} className="p-3 border rounded bg-white text-black">
          <option value="">Striker</option>
          {battingPlayers.map(p => (
            <option key={p._id} value={p._id}  disabled={p._id === nonStriker} >{p.name}</option>
          ))}
        </select>

        <select value={nonStriker} onChange={(e)=>setNonStriker(e.target.value)} className="p-3 border rounded bg-white text-black">
          <option value="">Non-Striker</option>
          {battingPlayers.map(p => (
            <option key={p._id} value={p._id} disabled={p._id === striker}>{p.name}</option>
          ))}
        </select>

        <select value={bowler} onChange={(e)=>setBowler(e.target.value)} className="p-3 border rounded bg-white text-black">
          <option value="">Bowler</option>
          {bowlingPlayers.map(p => (
            <option key={p._id} value={p._id} disabled={p._id === lastBowler}>{p.name} {p._id === lastBowler ? "(Last Over)" : ""}</option>
          ))}
        </select>
      </div>

      {/* CONTROLS */}
      <div className="flex gap-2 flex-wrap justify-center mb-6">
        {[0,1,2,3,4,6].map(r => (
          <button key={r} onClick={()=>update("run",r)} className="bg-green-500 px-3 py-2 text-white rounded">
            {r===0?"Dot":`+${r}`}
          </button>
        ))}
        <button onClick={()=>update("wide")} className="bg-yellow-500 px-3 py-2 text-white rounded">Wide</button>
        <button onClick={()=>update("no-ball")} className="bg-blue-500 px-3 py-2 text-white rounded">No Ball</button>

        <button onClick={()=>update("wicket")} disabled={!outType}
          className={`px-3 py-2 text-white rounded ${outType ? "bg-red-500" : "bg-gray-400"}`}>
          Wicket
        </button>

        <button onClick={undo} className="bg-black px-3 py-2 text-white rounded">Undo</button>
      </div>

      {/* HISTORY */}
      <div className="bg-white p-5 rounded-2xl shadow-lg">
        <h3 className="font-semibold mb-3 text-gray-700">Ball History</h3>
        <div className="flex gap-2 flex-wrap">
          {history.map((h, i) => (
            <span key={i} className="px-3 py-1 rounded bg-gray-200">{h}</span>
          ))}
        </div>
      </div>

     {/* ✅ NEW STATS UI */}
<div className="bg-white p-4 rounded shadow mt-6 mb-6 relative z-20 block w-full">
  <h3 className="font-bold mb-2 text-black">Batting Stats</h3>
  {Object.entries(batsmanStats).map(([id, s]) => {
    const p = players.find(x => x._id === id);
    return (
      <p key={id} className="text-black">
        {p?.name} - {s.runs}({s.balls}) | 4s:{s.fours} 6s:{s.sixes}
      </p>
    );
  })}
</div>

<div className="bg-white p-4 rounded shadow mt-4 mb-16 relative z-20 block w-full">
  <h3 className="font-bold mb-2 text-black">Bowling Stats</h3>
  {Object.entries(bowlerStats).map(([id, s]) => {
    const p = players.find(x => x._id === id);
    return (
      <p key={id} className="text-black">
        {p?.name} - {Math.floor(s.balls/6)}.{s.balls%6} | {s.runs}/{s.wickets}
      </p>
    );
  })}
</div>

    </AdminLayout>
  );
};

export default LiveMatchControl;