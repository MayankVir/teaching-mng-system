import React, { useEffect, useState } from "react";
import TestService from "../../services/test.service";
import { Redirect, useHistory } from "react-router-dom";
import { Container, Button, Input, Col, Row } from "reactstrap";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { ReactMediaRecorder } from "react-media-recorder";
// import Duration from "./Duration";

const renderQuestion = ({
  type,
  question,
  options,
  isRequired,
  questionFiles,
  ansFileType,
  index,
}) => {
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
  var questionBox = null;
  let questionFilesBox = questionFiles ? (
    questionFiles.map((fileData, index) => {
      switch (fileData.name.split(".").pop()) {
        case "jpg":
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
        case "png":
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
        case "mp4":
          return (
            <div className="col-6" key={index}>
              <video controls className="mb-3" style={{ maxWidth: "100%" }}>
                <source src={fileData.url} />
              </video>
            </div>
          );
        case "mp3":
          return (
            <div className="col-6" key={index}>
              {" "}
              <audio controls className="mb-3" style={{ width: "100%" }}>
                <source src={fileData.url} />
              </audio>
            </div>
          );
        default:
          return <span key={index}></span>;
      }
    })
  ) : (
    <></>
  );
  switch (type) {
    case "short_ans":
      questionBox = (
        <>
          <p className="text-muted mb-1 small">Short answer type question.</p>
          <div className="row justify-content-center d-flex">
            {questionFilesBox}
          </div>
          <textarea className="form-control" rows="5"></textarea>
        </>
      );
      break;
    case "long_ans":
      questionBox = (
        <>
          <p className="text-muted mb-1 small">Long answer type question.</p>
          <div className="row justify-content-center d-flex">
            {questionFilesBox}
          </div>
          <textarea className="form-control" rows="10"></textarea>
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
                name={true ? "radio1" : ""}
                value={data}
              />
              <label className="form-check-label">{data}</label>
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
            onStop={(blobUrl, blob) => console.log("Upload", blobUrl, blob)}
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
                        className="btn btn-success mt-2"
                        onClick={startRecording}
                      >
                        Start Recording
                      </button>
                      <button
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
          <Input type="file" accept={acceptFileType[ansFileType]} />
        </>
      );
      break;
    default:
      questionBox = <></>;
  }
  return (
    <>
      <h5 className="mb-0">
        <b>Question {index}.</b> {question}
        {isRequired && <span className="text-danger ml-1">*</span>}
      </h5>
      {questionBox}
    </>
  );
};

const TestPreview = () => {
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
  }, [testId]);

  const editTest = (e) => {
    history.push(`/tests/edit/${testId}`);
  };

  if (pageLoading)
    return (
      <div className="hardCenter">
        <Icon
          path={mdiLoading}
          className="spinner mr-2 text-primary "
          size={2}
        />
      </div>
    );

  return (
    <Container fluid>
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
        <Col className="mt-3">
          <Row>
            <div
              md="5"
              label="Hours"
              type="text"
              disabled={true}
              value={testData.data.duration.start}
            />
            <div
              label="Minutes"
              md="5"
              type="text"
              disabled={true}
              value={testData.data.duration.end}
            />
          </Row>
        </Col>
      </Row>
      <hr />
      {components.map((section, sectionIndex) => (
        <Container
          key={sectionIndex}
          className="bg-white rounded p-4 p-lg-5 shadow-sm mt-4"
          fluid
        >
          <h4 className="text-center font-weight-bold mb-0">{section.title}</h4>
          <p className="text-center text-muted mb-0">
            {section.data.description}
          </p>
          <hr />
          {section.components.map((question, questionIndex) => (
            <div key={questionIndex}>
              <div className="mt-3 mb-4">
                {renderQuestion({ ...question, index: questionIndex + 1 })}
              </div>
              <hr />
            </div>
          ))}
        </Container>
      ))}
      <div className="mt-4 mb-3 mb-lg-5 d-flex">
        <Button onClick={(e) => editTest(e)} color="success">
          Edit Test
        </Button>
      </div>
    </Container>
  );
};

export default TestPreview;
