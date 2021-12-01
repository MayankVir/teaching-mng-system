import { mdiVideo, mdiVideo3d, mdiVideoOff } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import testService from "../../services/test.service";
import "./Test.css";
import io from "socket.io-client";
import Peer from "peerjs";

const VideoMonitor = () => {
  const socket = io("http://localhost:8000", { secure: true });
  const { id } = useParams();
  const [testData, setTestData] = useState({
    course: null,
    title: "",
    data: {
      description: "",
      duration: {
        start: 0,
        end: 0,
      },
      assign: [],
    },
  });
  const StreamsRef = useRef([]);
  const [AllVideos, setAllVideos] = useState([]);
  const VideosRef = useRef([]);
  // const remoteVideoRef = useRef(null);

  useEffect(() => {
    testService.getOneTest(id).then((response) => {
      setTestData({
        course: response.data.course ? response.data.course : null,
        title: response.data.title ? response.data.title : "",
        data: {
          description: "",
          duration: { start: new Date(), end: new Date() },
          assign: [],
          ...response.data.data,
        },
      });
    });

    // WORKING CODE
    const peer = new Peer(
      `teacher_${(Math.floor(Math.random() * 10000) + 1).toString()}`,
      {
        host: "localhost",
        port: 5000,
        path: "/",
      }
    );
    peer.on("open", () => {
      console.log("Peer Opened");
      socket.emit("teacher-peer", peer.id);
    });

    peer.on("call", (call) => {
      call.answer();
      console.log(call);
      const peerId = call.peer;
      call.on("stream", (remoteStream) => {
        console.log("Hi in stream");
        StreamsRef.current.push({ id: peerId, remoteStream });
        setAllVideos((prev) => [...prev, 1]);
        // console.log(peer.id);
        VideosRef.current.forEach((eachVideo, i) => {
          if (StreamsRef.current[i]) {
            eachVideo.id = StreamsRef.current[i].id;
            eachVideo.srcObject = StreamsRef.current[i].remoteStream;
          }
        });
      });
    });

    socket.on("only-teacher", (id) => {
      console.log(id);
      let node = document.getElementById(id);
      if (node) {
        node.remove();
        let newStreamRef = StreamsRef.current.filter((each) => each.id !== id);
        StreamsRef.current = newStreamRef;

        console.log("StreamRef: ", StreamsRef);

        let newVideosRef = VideosRef.current.filter((each) => each.id !== id);
        VideosRef.current = newVideosRef;
        console.log("VideosRef: ", VideosRef);
      }
    });
  }, []);
  socket.on("studentss", (data) => {
    console.log(data);
  });

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ padding: "15px 20px" }}
    >
      <h2>Video Monitor for {testData.title}</h2>
      <hr style={{ width: "100%" }} />
      <div>
        {AllVideos.map((eachStream, i) => {
          return (
            <video
              key={i}
              // style={{ width: "175px", height: "125px", margin: "10px 0" }}
              style={{
                width: "168px",
                height: "125px",
                borderRadius: "10px",
                margin: "20px",
              }}
              ref={(VideoElem) => {
                if (VideoElem) {
                  // VideoElem.id = StreamsRef.current[i].id;
                  VideoElem.src = eachStream;
                  VideosRef.current[i] = VideoElem;
                }
              }}
              autoPlay
              muted
            />
          );
        })}
        {/* <video className="student ki video" ref={remoteVideoRef}></video> */}
      </div>
    </div>
  );
};

export default VideoMonitor;
