import React, { useContext, useEffect, useRef, useState } from "react";
import TestService from "../../services/test.service";
import { Redirect, useHistory } from "react-router-dom";
import {
  Container,
  Button,
  Input,
  Col,
  Row,
  FormGroup,
  Label,
} from "reactstrap";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import {
  ReactMediaRecorder,
  useReactMediaRecorder,
} from "react-media-recorder";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toast";
import Countdown from "react-countdown";
import uploadService from "../../services/upload.service";
import Peer from "peerjs";
import io from "socket.io-client";
var mime = require("mime-types");

const RenderQuestion = ({
  type,
  question,
  options,
  isRequired,
  questionFiles,
  ansFileType,
  question_details,
  index,
  sectionIndex,
  response,
  onResponseChange,
  onFilesChange,
  UploadToServer,
}) => {
  // var type = question_details["type"];
  // var question = question_details["question"];
  // var options = question_details["options"];
  // var isRequired = question_details["isRequired"];
  // var questionFiles = question_details["questionFiles"];
  // var ansFileType = question_details["ansFileType"];
  var identifier = sectionIndex + "," + index;

  var acceptFileType = {
    Any: "",
    Image: "image/*",
    Video: "video/*",
    Audio: "audio/*",
    PDFs: ".pdf",
    DOCs: ".doc, .docx",
  };

  var recordStatusMapping = {
    media_aborted: "Error",
    permission_denied: "Check Permission",
    no_specified_media_found: "Error",
    media_in_use: "Error",
    invalid_media_constraints: "Error",
    no_constraints: "Error",
    recorder_error: "Error",
    idle: "Press Start Recording",
    acquiring_media: "Initializing",
    recording: "Recording",
    stopping: "Stopping",
    stopped: "Stopped Recording",
  };

  //   const { status, startRecording, stopRecording, mediaBlobUrl } =
  //     useReactMediaRecorder({ video: true });

  var questionBox = null;
  let questionFilesBox = questionFiles ? (
    questionFiles.map((fileData, index) => {
      const fileType = mime.lookup(fileData.name);
      const fileExtn = fileType.substring(0, fileType.indexOf("/"));
      console.log(fileExtn);
      if (fileExtn === "image") {
        return (
          <div className="col-6" key={index}>
            <img
              className="mb-3"
              style={{ maxWidth: "100%" }}
              src={fileData.url}
              alt={fileData.name}
            />
          </div>
        );
      } else if (fileExtn === "video") {
        return (
          <div className="col-6" key={index}>
            <video controls className="mb-3" style={{ maxWidth: "100%" }}>
              <source src={fileData.url} />
            </video>
          </div>
        );
      } else if (fileExtn === "audio") {
        return (
          <div className="col-6" key={index}>
            <audio controls className="mb-3" style={{ maxWidth: "100%" }}>
              <source src={fileData.url} />
            </audio>
          </div>
        );
      } else return <span key={index}></span>;
    })
  ) : (
    <></>
  );
  switch (type) {
    case "descriptive":
      questionBox = (
        <>
          <p className="text-muted mb-1 small">Descriptive type question.</p>
          <div className="row justify-content-center d-flex">
            {questionFilesBox}
          </div>
          <textarea
            className="form-control"
            name={identifier}
            rows="5"
            required
            type="text"
            onChange={onResponseChange}
          />
        </>
      );
      break;
    case "checkbox":
      questionBox = (
        <>
          <p className="text-muted mb-1 small">Pick the correct option.</p>
          <div className="row justify-content-center d-flex">
            {questionFilesBox}
          </div>
          {options.map((data, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={identifier}
                id="checker"
                value={index}
                onChange={onResponseChange}
              />
              <label className="form-check-label">{data.name}</label>
            </div>
          ))}
        </>
      );
      break;
    case "record":
      questionBox = (
        <>
          <p className="text-muted mb-1 small">
            Use controls below to record! Allow any popups for camera & mic.
          </p>
          <div className="row justify-content-center d-flex">
            {questionFilesBox}
          </div>
          <p className="font-weight-bold mb-0">Recording Details:</p>
          <ReactMediaRecorder
            video={ansFileType === "Video"}
            audio={ansFileType === "Audio"}
            onStop={(blobUrl, blob) => {
              // console.log("Upload", blobUrl, blob);
              UploadToServer(identifier, blobUrl, blob);
              // onFilesChange(identifier, blob);
            }}
            render={({
              status,
              startRecording,
              stopRecording,
              mediaBlobUrl,
            }) => (
              <div>
                <p className="mb-1">Status: {recordStatusMapping[status]}</p>
                <div className="row">
                  <div className="col-6">
                    <p className="mb-0">Preview:</p>
                    <div>
                      {ansFileType === "Video" && (
                        <video width="100%" src={mediaBlobUrl} controls muted />
                      )}
                    </div>
                    <div>
                      {ansFileType === "Audio" && (
                        <audio
                          style={{ width: "100%" }}
                          src={mediaBlobUrl}
                          controls
                          muted
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <p className="mb-0">Controls:</p>
                    <div className="d-flex flex-column">
                      <button
                        type="button"
                        className="btn btn-success mt-2"
                        onClick={startRecording}
                      >
                        Start Recording
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger mt-2"
                        onClick={stopRecording}
                      >
                        Stop Recording
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        </>
      );
      break;
    case "file":
      questionBox = (
        <>
          <p className="text-muted mb-1 small">
            Upload the required file type. Allowed: {ansFileType}
          </p>
          <div className="row justify-content-center d-flex">
            {questionFilesBox}
          </div>
          <Input
            type="file"
            name={identifier}
            accept={acceptFileType[ansFileType]}
            // onChange={onResponseChange}
            onChange={onFilesChange}
          />
        </>
      );
      break;
    default:
      questionBox = <></>;
  }
  return (
    <>
      <h5 className="mb-0">
        <b>Question {index}.</b>

        {question}
        {isRequired && <span className="text-danger ml-1">*</span>}
      </h5>
      {questionBox}
    </>
  );
};

const GiveTest = () => {
  const socket = io("http://localhost:8000", { secure: true });
  const userVideo = useRef();

  const [response, setResponse] = useState({});
  const [components, setComponents] = useState([
    {
      title: "",
      data: {
        description: "",
      },
      components: [],
    },
  ]);

  const [pageLoading, setPageLoading] = useState(true);

  const [testData, setTestData] = useState({
    title: "",
    data: {
      description: "",
      duration: {
        start: 0,
        end: 0,
      },
    },
  });

  const changeResponse = (e) => {
    var l = e.target.name.split(",");
    l[0].toString();
    if (typeof l[1] != "undefined") l[1].toString();
    if (typeof response[l[0]] === "undefined") {
      response[l[0]] = {};
    }
    const tempRes = JSON.parse(JSON.stringify(response));
    tempRes[l[0]][l[1]] = e.target.value;
    setResponse(tempRes);
  };

  const changeFiles = (event) => {
    var file = event.target.files[0];
    var answerObj;
    var l = event.target.name.split(",");
    l[0].toString();
    if (typeof l[1] != "undefined") l[1].toString();
    if (typeof response[l[0]] === "undefined") {
      response[l[0]] = {};
    }
    uploadService.uploadFile(file, testId).then(
      (res) => {
        answerObj = { ...res.data, name: file.name };
        const tempRes = JSON.parse(JSON.stringify(response));
        tempRes[l[0]][l[1]] = answerObj;
        setResponse(tempRes);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const UploadToServer = (event, blobUrl, blob) => {
    var l = event.split(",");
    var answerObj;
    l[0].toString();
    if (typeof l[1] != "undefined") l[1].toString();
    if (typeof response[l[0]] === "undefined") {
      response[l[0]] = {};
    }
    uploadService.uploadFile(blob, testId).then(
      (res) => {
        answerObj = { ...res.data };
        const tempRes = JSON.parse(JSON.stringify(response));
        tempRes[l[0]][l[1]] = answerObj;
        setResponse(tempRes);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  let history = useHistory();

  const testId =
    history.location.pathname.split("/").length === 4
      ? history.location.pathname.split("/").pop()
      : null;

  useEffect(() => {
    setPageLoading(true);
    TestService.getOneTest(testId).then(
      (response) => {
        setTestData({
          title: response.data.title ? response.data.title : "",
          data: {
            description: "",
            duration: { start: 0, end: 0 },
            ...response.data.data,
          },
        });
        setComponents(response.data.components ? response.data.components : []);
        setPageLoading(false);
      },
      (error) => {
        return <Redirect to="/dashboard" />;
      }
    );

    // New Peer Connection
    const peer = new Peer(
      `student_${(Math.floor(Math.random() * 10000) + 1).toString()}`,
      {
        host: "localhost",
        port: 5000,
        path: "/",
      }
    );

    peer.on("open", () => {
      localStorage.setItem("peerId", peer.id);
    });

    // Local Video Stream on Page loading
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
      })
      .catch((err) => console.log(err));

    // Teacher calling to student and student calling back with stream
    socket.on("send-your-peer-call", (peerId) => {
      console.log("Request from teacher");
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          peer.call(peerId, stream);
          socket.emit("take-student-id", localStorage.getItem("peerid"));
        })
        .catch((err) => console.log(err));
    });

    // Sending emit to server if teacher is present
    socket.emit("send-me-to-teacher", (data) => {
      console.log(data);
      if (data.check) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            peer.call(data.peerId, stream);
            socket.emit("take-student-id", localStorage.getItem("peerid"));
          })
          .catch((err) => console.log(err));
      }
    });
  }, []);

  // socket.on("disconnect", () => {
  //   socket.emit("socket-disconnect", socket.id);
  // });
  if (pageLoading) {
    return (
      <div className="hardCenter">
        <Icon
          path={mdiLoading}
          className="spinner mr-2 text-primary "
          size={2}
        />
      </div>
    );
  }

  const submitTest = (e) => {
    e.preventDefault();
    console.log("Total Response: ", response);
    TestService.putUserResponse(testId, response)
      .then(() => {
        toast.success("Test Submitted Successfully");
        history.push(`/dashboard`);
      })
      .catch(toast.error("Something is Fishy!!"));
  };

  const isAdmin = () => {
    var type = JSON.parse(localStorage["type"].toString());
    // console.log(admin.name);

    if (type === "A") {
      return true;
    } else {
      return false;
    }
  };
  const editTest = (e) => {
    history.push(`/tests/edit/${testId}`);
  };

  const isTimeLeft = () => {
    const endTime = testData.data.duration.end;
    const currentTime = new Date();
    if (currentTime <= endTime) return true;
    return false;
  };

  return (
    <>
      <Container fluid style={{ padding: "20px 40px" }}>
        <Row>
          <Col className="ml-3" md="9">
            <Row>
              <h2 className="mt-3 font-weight-bold text-dark mb-0">
                {testData.title}
              </h2>
            </Row>
            <Row>
              <p className="text-muted">
                Description: {testData.data.description}
              </p>
            </Row>
          </Col>
          <Col
            className="mt-3"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Row>
              <Col md="15">
                {isTimeLeft() ? (
                  <FormGroup
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    {isTimeLeft() ? (
                      <Label style={{ fontSize: "1.25rem" }}>
                        Time Remaining
                      </Label>
                    ) : (
                      <></>
                    )}
                    <div
                      style={{
                        fontSize: "1.5rem",
                        border: "1px solid black",
                        background: "white",
                        borderRadius: "10px",
                        padding: "5px 10px",
                      }}
                    >
                      <Countdown
                        date={
                          Date.now() + (testData.data.duration.end - Date.now())
                        }
                      >
                        <div>Time Up Kiddo!!</div>
                      </Countdown>
                    </div>
                  </FormGroup>
                ) : (
                  <div
                    style={{
                      fontSize: "1.5rem",
                      border: "1px solid black",
                      background: "white",
                      borderRadius: "10px",
                      padding: "5px 10px",
                    }}
                  >
                    Time Up Kiddo!!
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <div>
          <Row>
            {/* <h1>Current user id is {peerId}</h1> */}
            <div>
              <video
                className="students own video"
                ref={userVideo}
                muted
                autoPlay
                style={{ width: "300px", height: "150px" }}
              />
            </div>
          </Row>
        </div>
        <form onSubmit={submitTest}>
          {" "}
          {/* {JSON.stringify(components)} */}
          {components.map((section, sectionIndex) => (
            <Container
              key={sectionIndex}
              className="bg-white rounded p-4 p-lg-5 shadow-sm mt-4"
              fluid
            >
              <h4 className="text-center font-weight-bold mb-0">
                {section.title}
              </h4>
              <p className="text-center text-muted mb-0">
                {section.data.description}
              </p>
              <hr />

              {section.components.map((question, questionIndex) => (
                <div key={questionIndex}>
                  <div className="mt-3 mb-4">
                    {isAdmin()
                      ? RenderQuestion({
                          ...question,
                          index: questionIndex + 1,
                        })
                      : RenderQuestion({
                          ...question,
                          question_details: question,
                          index: questionIndex + 1,
                          sectionIndex: sectionIndex + 1,
                          response: response,
                          onResponseChange: changeResponse,
                          onFilesChange: changeFiles,
                          UploadToServer: UploadToServer,
                        })}
                  </div>
                  <hr />
                </div>
              ))}
            </Container>
          ))}
          {isAdmin() ? (
            <div className="mt-4 mb-3 mb-lg-5 d-flex">
              <Button onClick={(e) => editTest(e)} color="success">
                Edit Test
              </Button>
            </div>
          ) : (
            <div className="mt-4 mb-3 mb-lg-5 d-flex">
              <Button color="success">Submit</Button>
            </div>
          )}
          {/* <div className="mt-4 mb-3 mb-lg-5 d-flex">
          <Button color="success">Submit</Button>
        </div> */}
        </form>
      </Container>
      <ToastContainer />
    </>
  );
};

export default GiveTest;
