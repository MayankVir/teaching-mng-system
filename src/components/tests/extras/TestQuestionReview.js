import { mdiDelete, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import {
  Button,
  Col,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";

import UploadService from "../../../services/upload.service";
import { useHistory } from "react-router-dom";

const TestQuestionReview = ({
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
    UploadService.uploadFile(file, testId).then(
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

  return <></>;
};

export default TestQuestionReview;
