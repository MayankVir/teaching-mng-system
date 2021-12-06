import React from "react";
import { Button, FormGroup, Input, Label, Row, Col } from "reactstrap";
import { Media, Player, controls } from "react-media-player";
const { PlayPause, MuteUnmute } = controls;

var mime = require("mime-types");
const RenderQuestion = ({
  question_details,
  index,
  sectionIndex,
  response,
  marking,
  onReviewChange,
  onScoreChange,
  UserType,
}) => {
  // if (response !== undefined) {
  // if (response[sectionIndex] !== undefined) {
  // if (response[sectionIndex][index] !== undefined) {
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
  var ans_mcq = question_details["ans_mcq"];
  var identifier = sectionIndex + "," + index;
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
          <p className="text-muted mb-1 small">
            Descriptive answer type question.
          </p>
          <div className="row justify-content-center d-flex">
            {questionFilesBox}
          </div>
          <p className="form-control">
            {response[sectionIndex][index]
              ? response[sectionIndex][index]
              : "No Response From Student"}
          </p>
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
          {options.map((option, idx) => {
            return (
              <Row className="mb-2" key={idx}>
                <Col
                  xs="auto"
                  className="d-flex align-items-center justify-content-center px-0"
                >
                  <input
                    type="radio"
                    style={{ marginLeft: "10px" }}
                    name={`option${index}`}
                    className="border-primary"
                    // checked={isChecked}
                  />
                </Col>
                <Col>
                  <Input
                    type="text"
                    value={option.name}
                    name={index}
                    disabled
                  />
                </Col>
              </Row>
            );
          })}
          <div>
            Student Selected :{" "}
            {response[sectionIndex][index] ? (
              <b> Option {parseInt(response[sectionIndex][index]) + 1} </b>
            ) : (
              "No Response From Student"
            )}
          </div>
        </>
      );
      break;
    case "record":
      questionBox = (
        <>
          <div className="row justify-content-center d-flex">
            {questionFilesBox}
          </div>
          {response[sectionIndex][index] ? (
            <Media>
              <div className="media">
                <div className="media-player">
                  <Player src={response[sectionIndex][index].url} />
                </div>
                <div className="media-controls">
                  <PlayPause />
                  <MuteUnmute />
                </div>
              </div>
            </Media>
          ) : (
            <div style={{ width: "100%", textAlign: "center" }}>
              No Response from Student
            </div>
          )}
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
          {response[sectionIndex][index].url ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={response[sectionIndex][index].url}
            >
              <Button color="success" type="button">
                Download Answer File
              </Button>
            </a>
          ) : (
            "No response from student"
          )}
        </>
      );
      break;
    default:
      questionBox = <></>;
  }

  const isMarking = () => {
    if (
      marking &&
      marking[sectionIndex] !== undefined &&
      marking[sectionIndex][index] !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div style={{ margin: "0 0 10px 0" }}>
      <h5 className="mb-0">
        <b>Question {index}.</b> {question}
        {isRequired && <span className="text-danger ml-1">*</span>}
      </h5>
      {questionBox}
      <Col style={{ margin: "20px 0" }}>
        <FormGroup>
          <Label className="mb-0 small">
            {" "}
            <h6>Score</h6>
          </Label>
          {/* {console.log(marking)} */}
          <Input
            name={identifier}
            placeholder="Enter your score"
            onChange={onScoreChange}
            disabled={UserType === "S" ? true : false}
            defaultValue={isMarking() ? marking[sectionIndex][index].score : ""}
          />
          <Label className="mb-0 mt-3 small">
            {" "}
            <h6>Review</h6>
          </Label>
          {/* // {console.log(marking[sectionIndex][index].review)} */}
          <Input
            name={identifier}
            placeholder="Enter your review"
            onChange={onReviewChange}
            disabled={UserType === "S" ? true : false}
            defaultValue={
              isMarking() ? marking[sectionIndex][index].review : ""
            }
          />
        </FormGroup>
      </Col>
    </div>
  );
  // }
  // }
  // } else {
  // return <>No Response from Student</>;
  // }
};

export default RenderQuestion;
