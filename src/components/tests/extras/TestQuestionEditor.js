import { mdiDelete, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";

import TestService from "../../../services/test.service";
import { useHistory } from "react-router-dom";

const TestQuestionEditor = ({
  questionData,
  updateQuestion,
  questionIndex,
}) => {
  const {
    id,
    type,
    question,
    options,
    isRequired,
    questionFiles,
    ansFileType,
  } = questionData;

  const history = useHistory();
  const [rSelected, setRSelected] = useState(null);

  const changeQuestion = (event) => {
    updateQuestion({
      id,
      type,
      options,
      question: event.target.value,
      isRequired,
      questionFiles,
      ansFileType,
    });
  };

  const changeQuestionFiles = (event) => {
    let testId = history.location.pathname.split("/").pop();
    var file = event.target.files[0];
    TestService.uploadFile(file, testId).then(
      (response) => {
        let questionObj = { ...response.data, name: file.name };
        if (questionFiles)
          updateQuestion({
            id,
            type,
            options,
            question,
            isRequired,
            questionFiles: [...questionFiles, questionObj],
            ansFileType,
          });
        else
          updateQuestion({
            id,
            type,
            options,
            question,
            isRequired,
            questionFiles: [questionObj],
            ansFileType,
          });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const deleteQuestionFile = (index) => {
    const _questionFiles = [...questionFiles];
    _questionFiles.splice(index, 1);
    updateQuestion({
      id,
      type,
      options,
      question,
      isRequired,
      questionFiles: _questionFiles,
      ansFileType,
    });
  };

  const changeType = (event) => {
    var changeDefaultSubType = "";
    if (event.target.value === "file") changeDefaultSubType = "Any";
    else if (event.target.value === "record") changeDefaultSubType = "Video";
    updateQuestion({
      id,
      type: event.target.value,
      options,
      question,
      isRequired,
      questionFiles,
      ansFileType: changeDefaultSubType,
    });
  };

  const changeRequired = (event) => {
    updateQuestion({
      id,
      type,
      options,
      question,
      isRequired: event.target.checked,
      questionFiles,
      ansFileType,
    });
  };

  const addOption = () => {
    if (options) {
      updateQuestion({
        id,
        type,
        options: [...options, ""],
        question,
        isRequired,
        questionFiles,
        ansFileType,
      });
    } else {
      updateQuestion({
        id,
        type,
        options: [""],
        question,
        isRequired,
        questionFiles,
        ansFileType,
      });
    }
  };

  const changeOption = (event) => {
    let bOptions = [...options];
    bOptions[event.target.name] = event.target.value;
    updateQuestion({
      id,
      type,
      options: bOptions,
      question,
      isRequired,
      questionFiles,
      ansFileType,
    });
  };

  const changeAnsFileType = (event) => {
    updateQuestion({
      id,
      type,
      options,
      question,
      isRequired,
      questionFiles,
      ansFileType: event.target.value,
    });
  };

  const deleteOption = (toDel) => {
    let bOptions = [...options];
    bOptions.splice(toDel, 1);
    updateQuestion({
      id,
      type,
      options: bOptions,
      question,
      isRequired,
      questionFiles,
      ansFileType,
    });
  };

  const renderOptions = () => {
    return (
      <div className="mt-3">
        <div className="mt-2">
          <Label className="small mb-0">Options</Label>
          {options &&
            options.map((data, index) => (
              <Row className="mb-2" key={index}>
                <Col>
                  <Input
                    type="text"
                    value={data}
                    placeholder="Your option here"
                    onChange={changeOption}
                    name={index}
                    required
                  />
                </Col>
                <Col
                  xs="auto"
                  className="d-flex align-items-center justify-content-center px-0"
                >
                  <Icon
                    path={mdiDelete}
                    size={1}
                    color="#212529"
                    onClick={() => {
                      deleteOption(index);
                    }}
                  />
                </Col>
                <Col
                  xs="auto"
                  className="d-flex align-items-center justify-content-center px-0"
                >
                  <Input
                    type={rSelected === 1 ? "radio" : "checkbox"}
                    style={{ marginLeft: "10px" }}
                    name="radio1"
                    className="border-primary"
                  />
                </Col>
              </Row>
            ))}
          <div className="small my-1">
            <Button
              onClick={addOption}
              outline
              color="red"
              style={{ fontSize: "0.7rem" }}
              className="d-flex align-items-center border-success text-success"
              size="sm"
            >
              <Icon path={mdiPlus} size={0.6} /> Add an Option
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderQuestionFiles = () => {
    return (
      <>
        {questionFiles && questionFiles.length > 0 && (
          <Label className="mb-0 small">Uploaded Files</Label>
        )}
        {questionFiles.map((data, index) => (
          <p className="mb-0" key={index}>
            {data.name}{" "}
            <Icon
              size={1}
              className="hoverPointer"
              path={mdiDelete}
              onClick={() => deleteQuestionFile(index)}
            />
          </p>
        ))}
      </>
    );
  };

  return (
    <Col>
      <FormGroup>
        <Label className="mb-1 small">Question {questionIndex + 1}</Label>
        <Input
          type="textarea"
          value={question}
          placeholder="Enter your question"
          onChange={changeQuestion}
          className="mb-2"
        />
      </FormGroup>
      <FormGroup>
        <Label className="mb-0 mr-5 small">Question Files</Label>
        <Input
          type="file"
          name="file"
          accept="audio/*,video/*,image/*"
          onChange={changeQuestionFiles}
          style={{ margin: "0 0 0 5px" }}
        />
        <FormText>
          Upload multiple files pertaining to question. Files allowed:
          Images(JPG, PNG), Videos(MP4), Audios(MP3).
        </FormText>
        {questionFiles && renderQuestionFiles()}
      </FormGroup>
      <div className="d-flex justify-content-between w-50">
        <Col xs={12} md="auto">
          <Label className="mb-0 small">Answer Type</Label>
          <div className="d-flex">
            <Input
              type="select"
              onChange={changeType}
              className="border-primary pl-2"
              value={type}
            >
              <option value="descriptive">Descriptive</option>
              <option value="checkbox">Multiple Choice</option>
              <option value="record">Record</option>
              <option value="file">File Upload</option>
            </Input>
            {type === "file" && (
              <Input
                type="select"
                onChange={changeAnsFileType}
                className="border-primary pl-2 ml-2"
                value={ansFileType}
              >
                <option value="Any">All Files</option>
                <option value="Image">Image</option>
                <option value="Video">Video</option>
                <option value="Audio">Audio</option>
                <option value="PDFs">PDFs</option>
                <option value="DOCs">DOCs</option>
              </Input>
            )}
            {type === "record" && (
              <Input
                type="select"
                onChange={changeAnsFileType}
                className="border-primary pl-2 ml-2"
                value={ansFileType}
              >
                <option value="Video">Video</option>
                <option value="Audio">Audio</option>
              </Input>
            )}
          </div>
        </Col>
        {type === "checkbox" ? (
          <div
            className="d-flex justify-content-center align-items-center "
            style={{
              marginTop: "25px",
            }}
          >
            <ButtonGroup>
              <div style={{ marginRight: "10px" }}>
                <Button
                  color="primary"
                  onClick={() => setRSelected(1)}
                  active={rSelected === 1}
                  style={{
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.75rem",
                  }}
                >
                  Single Choice
                </Button>
              </div>
              <div style={{ marginRight: "10px" }}>
                <Button
                  color="primary"
                  onClick={() => setRSelected(2)}
                  active={rSelected === 2}
                  style={{
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.75rem",
                    marginRight: "5px",
                  }}
                >
                  Multiple Choice
                </Button>
              </div>
            </ButtonGroup>
          </div>
        ) : (
          <> </>
        )}
      </div>
      {type === "checkbox" && renderOptions()}
      <div className="pl-4 mt-3">
        <Input
          type="checkbox"
          checked={isRequired}
          onChange={changeRequired}
          className="border-primary"
        />{" "}
        <Label className="mb-0 small">Is Required?</Label>
      </div>
    </Col>
  );
};

export default TestQuestionEditor;
