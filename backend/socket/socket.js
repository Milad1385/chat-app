import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

// online users obj
let onlineUsers = {}; //{userId : socketId}

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
  },
});

export const getReceiverSocketId = (userId) => {
  return onlineUsers[userId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  onlineUsers[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

export { app, io, server };
