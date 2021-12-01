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

let connectedTokens = [];
let studentIds = [];
let teacherId;

// This function triggers whenever new peer gets connected, either student or teacher.
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

// This function triggers whenever new peer gets disconnected. If the peer is student, then we filter out the object from all the connected students arrays so as to only keep students which are giving test
peerServer.on("disconnect", (client) => {
  studentIds = studentIds.filter((id) => id !== client.id);
  connectedTokens = connectedTokens.filter(
    (eachStudent) => eachStudent.peer !== client.id
  );
  console.log(client.id, " has been disconnected");
  console.log("All Tokens: ", connectedTokens);
  console.log("Teacher is: ", teacherId);
  io.emit("only-teacher", client.id);
});

io.on("connection", (socket) => {
  // Function Fires when teachers joins for the first time
  socket.on("hello-teacher", (id) => {
    // This emits to all the students with teacher peer id to call
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

  // this socket function checks if a student is trying to give test again. so we will check if we have already in the array, we will return false else true
  socket.on("check-socket", (id, cb) => {
    let found = false;
    connectedTokens.forEach((each) => {
      if (each.token === id) {
        found = true;
        return true;
      }
    });
    if (found) {
      console.log("All Tokens: ", connectedTokens);
      cb(true);
    } else {
      connectedTokens.push({ token: id, peer: null });
      console.log("New Token: ", connectedTokens);
      cb(false);
    }
  });

  // This is storing the peer is with the token of the student when they joins for the first time
  socket.on("save-my-peer", (data) => {
    connectedTokens.map((each) => {
      console.log("saving the peer");
      if (each.token === data.token) {
        each.peer = data.peer;
      }
    });
  });
});

server.listen(8000, () => console.log("server is running on port 8000"));
