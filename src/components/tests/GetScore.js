import React, { useEffect, useState } from "react";
import TestService from "../../services/test.service";
import { Redirect, useHistory } from "react-router-dom";
import { Container, Button, Input, Col, Row } from "reactstrap";
import Icon from "@mdi/react";
import jwt_decode from "jwt-decode";
import { mdiLoading } from "@mdi/js";
// import { ReactMediaRecorder } from "react-media-recorder";
// import Duration from "./Duration";
// import { FormGroup, Label } from "reactstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// For animation
import { easeLinear } from "d3-ease";
import AnimatedProgressProvider from "./TestResponseAnimations/AnimatedProgressProvider";
import ChangingProgressProvider from "./TestResponseAnimations/ChangingProgressProvider";
import { Media, Player, controls } from "react-media-player";
const { PlayPause, MuteUnmute } = controls;
const RenderQuestion = ({
  question_details,
  index,
  sectionIndex,
  response,
  marking,
}) => {
  var acceptFileType = {
    Any: "",
    Image: "image/*",
    Video: "video/*",
    Audio: "audio/*",
    PDFs: ".pdf",
    DOCs: ".doc, .docx",
  };
  var type = question_details["type"];
  var question = question_details["question"];
  var options = question_details["options"];
  var isRequired = question_details["isRequired"];
  var questionFiles = question_details["questionFiles"];
  var ansFileType = question_details["ansFileType"];
  var identifier = sectionIndex + "," + index;
  var identifier = sectionIndex + "," + index;
  var questionBox = null;
  if (response != undefined) {
    if (response[sectionIndex] != undefined) {
      if (response[sectionIndex][index] != undefined) {
        var acceptFileType = {
          Any: "",
          Image: "image/*",
          Video: "video/*",
          Audio: "audio/*",
          PDFs: ".pdf",
          DOCs: ".doc, .docx",
        };
        var type = question_details["type"];
        var question = question_details["question"];
        var options = question_details["options"];
        var isRequired = question_details["isRequired"];
        var questionFiles = question_details["questionFiles"];
        var ansFileType = question_details["ansFileType"];
        var identifier = sectionIndex + "," + index;
        var identifier = sectionIndex + "," + index;
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
                    <video
                      controls
                      className="mb-3"
                      style={{ maxWidth: "100%" }}
                    >
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
                <p className="text-muted mb-1 small">
                  Short answer type question.
                </p>
                <div className="row justify-content-center d-flex">
                  {questionFilesBox}
                </div>
                <p className="form-control">{response[sectionIndex][index]}</p>
              </>
            );
            break;
          case "long_ans":
            questionBox = (
              <>
                <p className="text-muted mb-1 small">
                  Long answer type question.
                </p>
                <div className="row justify-content-center d-flex">
                  {questionFilesBox}
                </div>
                <p className="form-control">{response[sectionIndex][index]}</p>
              </>
            );
            break;
          case "checkbox":
            questionBox = (
              <>
                <p className="text-muted mb-1 small">
                  Pick the correct option.
                </p>
                <div className="row justify-content-center d-flex">
                  {questionFilesBox}
                </div>
                <div>Selected : {response[sectionIndex][index]}</div>
              </>
            );
            break;
          case "record":
            questionBox = (
              <>
                <div className="row justify-content-center d-flex">
                  {questionFilesBox}
                </div>

                <Media>
                  <div className="media">
                    <div className="media-player">
                      <Player src={response[sectionIndex][index]} />
                    </div>
                    <div className="media-controls">
                      <PlayPause />
                      <MuteUnmute />
                    </div>
                  </div>
                </Media>
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
                  value={response[sectionIndex][index]}
                  accept={acceptFileType[ansFileType]}
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
              <b>Question {index}.</b> {question}
              {isRequired && <span className="text-danger ml-1">*</span>}
            </h5>
            {questionBox}
          </>
        );
      }
    }
  }
  var res = <></>;
  if (marking != undefined) {
    if (marking[sectionIndex] != undefined) {
      if (marking[sectionIndex][index] != undefined) {
        res = (
          <>
            <AnimatedProgressProvider
              valueStart={0}
              valueEnd={marking[sectionIndex][index]["score"]}
              duration={3}
              easingFunction={easeLinear}
              repeat
            >
              {(value) => {
                const roundedValue = Math.round(value);
                return (
                  <div className="row">
                    <div className="col-6">
                      <div style={{ width: 150, height: 150 }}>
                        <ChangingProgressProvider
                          values={[marking[sectionIndex][index]["score"]]}
                        >
                          {(percentage) => (
                            <CircularProgressbar
                              value={percentage}
                              text={`${percentage}%`}
                              styles={buildStyles({
                                pathTransitionDuration: 0.15,
                              })}
                            />
                          )}
                        </ChangingProgressProvider>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="card">
                        <div className="card-header">Review</div>
                        <div class="card-body">
                          <blockquote class="blockquote mb-0">
                            <p
                              style={{
                                fontSize: "15px",
                                overflowY: "scroll",
                                height: "50px",
                              }}
                            >
                              {marking[sectionIndex][index]["review"]}
                            </p>
                            <footer class="blockquote-footer">
                              Dr. Athe{" "}
                              <cite title="Source Title">
                                (Associate Proffessor))
                              </cite>
                            </footer>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </AnimatedProgressProvider>
          </>
        );
      }
    }
  }
  return (
    <>
      <h5 className="mb-0">
        <b>Question {index}.</b> {question}
        {isRequired && <span className="text-danger ml-1">*</span>}
      </h5>
      {questionBox}
      <br />
      {res}
    </>
  );
};

const TestResponse = () => {
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
  const [studentResponse, setStudentResponse] = useState({});
  const [marking, setMarking] = useState({});

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
        // var student = window.localStorage["user"];
        var student = JSON.parse(window.localStorage["user"].toString());
        var decoded = jwt_decode(student["token"]);
        // console.log(decoded);
        console.log(decoded["email"]);
        TestService.getOneResponse(decoded["email"]).then(
          (res) => {
            console.log(res);
            setStudentResponse(res.data[0]["response"]);
            setMarking(res.data[0]["marking"]);
          },
          (error) => {
            return <Redirect to="/dashboard" />;
          }
        );

        setPageLoading(false);
      },
      (error) => {
        return <Redirect to="/dashboard" />;
      }
    );
  }, [testId]);

  const showTests = (e) => {
    history.push(`/tests/`);
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

  console.log(studentResponse);
  console.log(marking);
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
                <RenderQuestion
                  question_details={question}
                  index={questionIndex + 1}
                  sectionIndex={sectionIndex + 1}
                  response={studentResponse}
                  marking={marking}
                />
              </div>
              <hr />
            </div>
          ))}
        </Container>
      ))}
      <div className="mt-4 mb-3 mb-lg-5 d-flex">
        <Button onClick={(e) => showTests(e)} color="success">
          Back To tests
        </Button>
      </div>
    </Container>
  );
};

export default TestResponse;
