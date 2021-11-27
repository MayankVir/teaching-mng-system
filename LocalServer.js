const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const { PeerServer } = require("peer");

const peerServer = PeerServer({ port: 5000, path: "/" });

let studentIds = [];
let teacherId;

peerServer.on("connection", (client) => {
  const checkId = client.id.split("_");
  if (checkId[0] === "student") {
    studentIds.push(client.id);
    console.log("Student Peer Connected");
  } else {
    console.log("Teacher Peer Connected");
  }
  if (checkId[0] === "teacher") {
    teacherId = client.id;
    console.log(teacherId);
  }
  console.log(studentIds);
});

peerServer.on("disconnect", (client) => {
  studentIds = studentIds.filter((id) => id !== client.id);
  console.log(client.id, " has been disconnected");
  console.log("Teacher is: ", teacherId);
  io.emit("only-teacher", client.id);
});

io.on("connection", (socket) => {
  // Fires when teachers joins for the first time
  socket.on("hello-teacher", (id) => {
    // this is is teacher peer id
    socket.broadcast.emit("go-to-students", id);
    teacherId = id;
  });

  // students sending stream when teacher joins
  socket.on("teacher-peer", (peerId) => {
    socket.broadcast.emit("send-your-peer-call", peerId);
  });

  // student sending the stream if teacher is already there
  socket.on("send-me-to-teacher", (cb) => {
    let data = { check: false, peerId: null };
    if (teacherId) {
      data.check = true;
      data.peerId = teacherId;
    }
    cb(data);
  });
});

server.listen(8000, () => console.log("server is running on port 8000"));
