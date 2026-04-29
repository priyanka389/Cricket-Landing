const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require("./routes/playerRoutes");
const matchRoutes = require("./routes/matchRoutes");
const userRoutes = require("./routes/userRoutes");
const activityRoutes = require("./routes/activityRoutes");
const squadRoutes = require("./routes/squadRoutes");
const liveFeatureRoutes = require("./routes/liveFeatureRoutes");
const reactionRoutes = require("./routes/reactionRoutes");
const paymentRoutes =
require("./routes/paymentRoutes");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const viewers = {};

// middleware
app.use(cors());
// app.use(express.json());

app.use(
  express.json({
    limit: "20mb"
  })
);

app.use(
  express.urlencoded({
    limit: "20mb",
    extended: true
  })
);

// DB connect
require("./config/db")();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/squad", squadRoutes);
app.use("/api/user", userRoutes);

app.use("/api/watchlist", require("./routes/watchlistRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/live", liveFeatureRoutes);
app.use("/api/reaction", reactionRoutes);
app.use(
"/api/payment",
paymentRoutes
);
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  res.setHeader(
    "Cross-Origin-Opener-Policy",
    "same-origin-allow-popups"
  );
  res.setHeader(
    "Cross-Origin-Embedder-Policy",
    "unsafe-none"
  );
  next();
});

// SOCKET
io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("joinMatch", (matchId) => {
    socket.join(matchId);

    socket.matchId = matchId;

    if (!viewers[matchId]) {
      viewers[matchId] = 0;
    }

    viewers[matchId]++;

    io.to(matchId).emit(
      "viewerUpdate",
      viewers[matchId]
    );
  });

  socket.on("sendMessage", (data) => {
    io.to(data.matchId).emit(
      "receiveMessage",
      data
    );
  });

  socket.on("typing", (data) => {
  socket.to(data.matchId).emit(
    "showTyping",
    data.username
  );
});

  socket.on(
    "sendReaction",
    async (data) => {
      try {
        const Reaction = require("./models/Reaction");

        let react =
          await Reaction.findOne({
            matchId:
              data.matchId
          });

        if (!react) {
          react =
            await Reaction.create({
              matchId:
                data.matchId
            });
        }

        react[data.type] += 1;

        await react.save();

        io.to(
          data.matchId
        ).emit(
          "receiveReaction",{
            counts: react,
    type: data.type
          }
          
        );
      } catch (err) {
        console.log(err);
      }
    }
  );

  socket.on(
    "disconnect",
    () => {
      const matchId =
        socket.matchId;

      if (
        matchId &&
        viewers[matchId]
      ) {
        viewers[matchId]--;

        if (
          viewers[matchId] < 0
        ) {
          viewers[matchId] = 0;
        }

        io.to(matchId).emit(
          "viewerUpdate",
          viewers[matchId]
        );
      }

      console.log(
        "User Left"
      );
    }
  );
});

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

server.listen(
  process.env.PORT,
  () => {
    console.log(
      `Server running on port ${process.env.PORT}`
    );
  }
);