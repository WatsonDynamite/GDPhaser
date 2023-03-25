import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

server.listen(3002, () => {
  console.log("listening on *:3002");
});

io.on("connection", (socket) => {
  console.log("a user connected with id: " + socket.id);
});
