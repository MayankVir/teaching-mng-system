import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Form,
  // FormGroup,
  // Input,
  // Label,
  Row,
  Col,
  Container,
} from "reactstrap";
// import DragComponent from "./DragComponent";
import UserService from "../../services/user.service";
import { Redirect, useHistory } from "react-router-dom";
import TestService from "../../services/test.service";
import RenderQuestion from "./extras/RenderQuestion";
// var mime = require("mime-types");

const ReviewTest = () => {
  const { id } = useParams();

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
    setSaving(true);
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
    setSaving(false);
  };

  // const updateQuestion = (sectionIndex, questionIndex, data) => {
  //   const _components = [...components];
  //   _components[sectionIndex].components[questionIndex] = data;
  //   setComponents(_components);
  // };

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
      <div className="container-fluid" style={{ padding: "15px 7%" }}>
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
              <h3 style={{ textAlign: "center" }}>Test Details</h3>
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

            <div className="my-4 mb-lg-5 d-flex justify-content-center">
              <Button
                disabled={saving}
                type="submit"
                className="d-flex align-items-center"
                color="success"
                style={{ margin: "0 50px" }}
              >
                {saving && (
                  <Icon path={mdiLoading} className="spinner mr-2" size={1} />
                )}
                Save Review
              </Button>
              <Button onClick={(e) => previewTest(e)} color="primary">
                Preview Test
              </Button>
            </div>
          </Form>
        )}
      </div>
    </>
  );
};

export default ReviewTest;
