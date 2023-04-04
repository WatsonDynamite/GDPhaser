import express from "express";
import http from "http";
import { Server } from "socket.io";
import { GameState, Message } from "./types.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const chat: Message[] = [];

const gameState: GameState = {
  player1: null,
  player2: null,
  field: {
    player1grid: [],
    player2grid: [],
  },
};

server.listen(3002, () => {
  console.log("listening on *:3002");
});

//everything done inside io.[thing] is global
//everything done inside socket.[thing] is specific to that connection

io.on("connection", (socket) => {
  console.log(`User ${socket.handshake.auth.username} has connected.`);
  const joinMsg = {
    user: "[SERVER]",
    message: `User ${socket.handshake.auth.username} has connected.`,
  };
  chat.push(joinMsg);

  io.emit("chatMessage", joinMsg);
  //check if there already is a player 1, if so, set current user to player 1, if not, set to player 2,
  //if there already are 2 players, everyone else is a spectator
  if (!gameState.player1) {
    gameState.player1 = socket.id;
    socket.on("initData", (data) => {
      const { party, grid } = data;
      gameState.field.player1grid = grid;
      socket.emit("youAre", 1);
    });
  } else if (!gameState.player2) {
    gameState.player2 = socket.id;
    socket.on("initData", (data) => {
      const { party, grid } = data;
      gameState.field.player2grid = grid;
      socket.emit("youAre", 2);

      //two players connected, game ready

      setTimeout(() => {
        io.emit("gameReady");
      }, 400);
    });
  } else {
    //spectators
  }

  setTimeout(() => {
    socket.emit("loadChatHistory", chat);
    io.emit("refreshGameState", gameState);
    console.log(gameState);
  }, 400);

  socket.on("chatMessage", (data) => {
    chat.push(data);
    io.emit("chatMessage", data);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.handshake.auth.username} has disconnected.`);
    if (socket.id === gameState.player1) {
      gameState.player1 = null;
      gameState.field.player1grid = [];
    }
    if (socket.id === gameState.player2) {
      gameState.player2 = null;
      gameState.field.player2grid = [];
    }
    setTimeout(() => {
      io.emit("chatMessage", {
        user: "[SERVER]",
        message: `User ${socket.handshake.auth.username} has disconnected.`,
      });
    });
  });
});
