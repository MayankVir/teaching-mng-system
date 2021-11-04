import { mdiPlus, mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Container,
} from "reactstrap";
import TestQuestionReview from "./extras/TestQuestionReview";
// import DragComponent from "./DragComponent";
import UserService from "../../services/user.service";
import { Redirect, useHistory } from "react-router-dom";
// import Duration from "./Duration";
// import jwt_decode from "jwt-decode";

// import { ReactMediaRecorder } from "react-media-recorder";
import { Media, Player, controls } from "react-media-player";
import TestService from "../../services/test.service";
import RenderQuestion from "./extras/RenderQuestion";
const { PlayPause, MuteUnmute } = controls;
var mime = require("mime-types");

const ReviewTest = () => {
  const { id } = useParams();
  // const RenderQuestion = ({
  //   question_details,
  //   index,
  //   sectionIndex,
  //   response,
  //   marking,
  //   onReviewChange,
  //   onScoreChange,
  // }) => {
  //   console.log(response);
  //   if (response !== undefined) {
  //     if (response[sectionIndex] !== undefined) {
  //       if (response[sectionIndex][index] !== undefined) {
  //         var acceptFileType = {
  //           Any: "",
  //           Image: "image/*",
  //           Video: "video/*",
  //           Audio: "audio/*",
  //           PDFs: ".pdf",
  //           DOCs: ".doc, .docx",
  //         };
  //         var type = question_details["type"];
  //         var question = question_details["question"];
  //         var options = question_details["options"];
  //         var isRequired = question_details["isRequired"];
  //         var questionFiles = question_details["questionFiles"];
  //         var ansFileType = question_details["ansFileType"];
  //         var identifier = sectionIndex + "," + index;
  //         //   var identifier = sectionIndex + "," + index;
  //         var questionBox = null;
  //         let questionFilesBox = questionFiles ? (
  //           questionFiles.map((fileData, index) => {
  //             const fileType = mime.lookup(fileData.name);
  //             const fileExtn = fileType.substring(0, fileType.indexOf("/"));
  //             console.log(fileExtn);
  //             if (fileExtn === "image") {
  //               return (
  //                 <div className="col-6" key={index}>
  //                   <img
  //                     className="mb-3"
  //                     style={{ maxWidth: "100%" }}
  //                     src={fileData.url}
  //                     alt={fileData.name}
  //                   />
  //                 </div>
  //               );
  //             } else if (fileExtn === "video") {
  //               return (
  //                 <div className="col-6" key={index}>
  //                   <video
  //                     controls
  //                     className="mb-3"
  //                     style={{ maxWidth: "100%" }}
  //                   >
  //                     <source src={fileData.url} />
  //                   </video>
  //                 </div>
  //               );
  //             } else if (fileExtn === "audio") {
  //               return (
  //                 <div className="col-6" key={index}>
  //                   <audio
  //                     controls
  //                     className="mb-3"
  //                     style={{ maxWidth: "100%" }}
  //                   >
  //                     <source src={fileData.url} />
  //                   </audio>
  //                 </div>
  //               );
  //             } else return <span key={index}></span>;
  //           })(
  //             console.log(
  //               type,
  //               question,
  //               options,
  //               isRequired,
  //               questionFiles,
  //               ansFileType,
  //               identifier
  //             )
  //           )
  //         ) : (
  //           <></>
  //         );

  //         switch (type) {
  //           case "descriptive":
  //             questionBox = (
  //               <>
  //                 <p className="text-muted mb-1 small">
  //                   Descriptive answer type question.
  //                 </p>
  //                 {/* <div className="row justify-content-center d-flex">
  //                   {questionFilesBox}
  //                 </div> */}
  //                 <p className="form-control">
  //                   {response[sectionIndex][index]}
  //                 </p>
  //               </>
  //             );
  //             break;
  //           case "checkbox":
  //             questionBox = (
  //               <>
  //                 <p className="text-muted mb-1 small">
  //                   Pick the correct option.
  //                 </p>
  //                 <div className="row justify-content-center d-flex">
  //                   {console.log("Questions Files Box: ", questionFilesBox)}
  //                 </div>
  //                 <div>
  //                   Selected :{" "}
  //                   {
  //                     (console.log(response[sectionIndex]),
  //                     response[sectionIndex][index])
  //                   }
  //                 </div>
  //               </>
  //             );
  //             break;
  //           case "record":
  //             questionBox = (
  //               <>
  //                 <div className="row justify-content-center d-flex">
  //                   {questionFilesBox}
  //                 </div>

  //                 <Media>
  //                   <div className="media">
  //                     <div className="media-player">
  //                       <Player src={response[sectionIndex][index]} />
  //                     </div>
  //                     <div className="media-controls">
  //                       <PlayPause />
  //                       <MuteUnmute />
  //                     </div>
  //                   </div>
  //                 </Media>
  //               </>
  //             );
  //             break;
  //           case "file":
  //             questionBox = (
  //               <>
  //                 <p className="text-muted mb-1 small">
  //                   Upload the required file type. Allowed: {ansFileType}
  //                 </p>
  //                 <div className="row justify-content-center d-flex">
  //                   {questionFilesBox}
  //                 </div>
  //                 <Input
  //                   type="file"
  //                   value={response[sectionIndex][index]}
  //                   accept={acceptFileType[ansFileType]}
  //                 />
  //               </>
  //             );
  //             break;
  //           default:
  //             questionBox = <></>;
  //         }
  //         return (
  //           <>
  //             <h5 className="mb-0">
  //               <b>Question {index}.</b> {question}
  //               {isRequired && <span className="text-danger ml-1">*</span>}
  //             </h5>
  //             {questionBox}
  //             <Col>
  //               <FormGroup>
  //                 <Label className="mb-0 small">Score</Label>
  //                 <Input
  //                   name={identifier}
  //                   placeholder="Enter your score"
  //                   onChange={onScoreChange}
  //                 />
  //                 <Label className="mb-0 small">Review</Label>
  //                 <Input
  //                   name={identifier}
  //                   placeholder="Enter your review"
  //                   onChange={onReviewChange}
  //                 />
  //               </FormGroup>
  //             </Col>
  //           </>
  //         );
  //       }
  //     }
  //   }
  //   return <>Nothing to show</>;
  // };

  const [components, setComponents] = useState([
    {
      title: "",
      data: {
        description: "",
      },
      components: [],
    },
  ]);
  const [saving, setSaving] = useState(false);
  const [testId, setTestId] = useState(null);
  const [testData, setTestData] = useState({
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

  var [pageLoading, setPageLoading] = useState(true);
  var [studentResponse, setStudentResponse] = useState({});
  const [marking, setMarking] = useState({});

  const changeScore = (e) => {
    console.log("score changed");
    var l = e.target.name.split(",");
    l[0].toString();
    if (typeof l[1] != "undefined") l[1].toString();
    if (typeof marking[l[0]] === "undefined") {
      marking[l[0]] = {};
    }
    if (typeof marking[l[0]][l[1]] === "undefined") {
      marking[l[0]][l[1]] = { score: 0, review: "" };
    }
    setMarking(marking, (marking[l[0]][l[1]]["score"] = e.target.value));
  };
  const changeReview = (e) => {
    console.log("review changed");
    var l = e.target.name.split(",");
    l[0].toString();
    if (typeof l[1] != "undefined") l[1].toString();
    if (typeof marking[l[0]] === "undefined") {
      marking[l[0]] = {};
    }
    if (typeof marking[l[0]][l[1]] === "undefined") {
      marking[l[0]][l[1]] = { score: 0, review: "" };
    }
    setMarking(marking, (marking[l[0]][l[1]]["review"] = e.target.value));
  };
  let history = useHistory();

  useEffect(() => {
    setPageLoading(true);
    console.log("HERE");
    TestService.loadStudentResponse(id).then(
      async (response) => {
        console.log(response);
        const quiz_response = response.data.quiz;
        console.log(quiz_response);
        setTestId(quiz_response._id);
        setTestData({
          title: quiz_response.title ? quiz_response.title : "",
          data: {
            description: quiz_response.data.description
              ? quiz_response.data.description
              : "",
            duration: {
              start: quiz_response.data.duration.start,
              end: quiz_response.data.duration.end,
            },
            assign: quiz_response.data.assign,
          },
        });
        setComponents(quiz_response.components);
        console.log("Componenets: ", quiz_response.components);

        const student_response = response.data.response;
        console.log("Setting the response ", student_response);
        setStudentResponse(student_response);
        setMarking(response.data.marking);
        setPageLoading(false);
      },
      (error) => {
        return <Redirect to="/dashboard" />;
      }
    );
  }, []);

  const previewTest = (e) => {
    saveReview(e, () => {
      history.push(`/tests/preview/${testId}`);
    });
  };

  const saveReview = (e, callback) => {
    e.preventDefault();
    console.log(marking);
    TestService.getAssignedUsers(testId).then(
      (res) => {
        var users = res.data;
        console.log(res);
        users.forEach((user) => {
          if (user["_id"] === id) {
            console.log("given review");
            UserService.putUserReviewScore(user["_id"], marking);
            console.log("Submitted");
            history.push(`/dashboard`);
          }
        });
      },
      (error) => {
        return <Redirect to="/dashboard" />;
      }
    );
  };

  const updateQuestion = (sectionIndex, questionIndex, data) => {
    const _components = [...components];
    _components[sectionIndex].components[questionIndex] = data;
    setComponents(_components);
  };

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

  return (
    <>
      <div className="container-fluid">
        <div className="row pt-3">
          <div className="col">
            {pageLoading ? (
              <div
                className="justify-content-center align-items-end d-flex"
                style={{ minHeight: "250px" }}
              >
                <Icon
                  path={mdiLoading}
                  className="spinner mr-2 text-primary"
                  size={2}
                />
              </div>
            ) : (
              <h3>Test Details</h3>
            )}
          </div>
        </div>
        {!pageLoading && (
          <Form onSubmit={(e) => saveReview(e)}>
            <div className="">
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
              </Row>
              <hr />

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
                        <RenderQuestion
                          sectionIndex={sectionIndex + 1}
                          question_details={question}
                          index={questionIndex + 1}
                          response={studentResponse}
                          marking={marking}
                          onReviewChange={changeReview}
                          onScoreChange={changeScore}
                        />

                        {/* <TestQuestionReview
                          questionData={question}
                          questionIndex={questionIndex}
                          updateQuestion={(data) =>
                            updateQuestion(sectionIndex, questionIndex, data)
                          }
                        /> */}
                      </div>
                      <hr />
                    </div>
                  ))}
                </Container>
              ))}
            </div>

            <div className="mt-4 mb-3 mb-lg-5 d-flex">
              <Button onClick={(e) => previewTest(e)} color="primary">
                Preview Test
              </Button>
              <Button
                disabled={saving}
                type="submit"
                className="ml-3 d-flex align-items-center"
                color="success"
              >
                {saving && (
                  <Icon path={mdiLoading} className="spinner mr-2" size={1} />
                )}
                Save Review
              </Button>
            </div>
          </Form>
        )}
      </div>
    </>
  );
};

export default ReviewTest;
