import React, { useEffect, useState } from "react";
import TestService from "../../services/test.service";
import { Redirect, useHistory } from "react-router-dom";
import { Container, Button, Col, Row } from "reactstrap";
import Icon from "@mdi/react";
import jwt_decode from "jwt-decode";
import { mdiLoading } from "@mdi/js";
import "react-circular-progressbar/dist/styles.css";
import RenderQuestion from "./extras/RenderQuestion";

const GetScore = () => {
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
      async (response) => {
        setTestData({
          title: response.data.title ? response.data.title : "",
          data: {
            description: "",
            duration: { start: 0, end: 0 },
            ...response.data.data,
          },
        });
        setComponents(response.data.components ? response.data.components : []);
        var token = JSON.parse(localStorage["priksha_token"].toString());
        var decoded = jwt_decode(token);
        // console.log(decoded);
        console.log(decoded["email"]);
        await TestService.getOneResponse(decoded["email"]).then(
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
                {console.log(
                  `Response S${sectionIndex + 1} Q${questionIndex + 1}`,
                  studentResponse
                )}
                {console.log(marking)}
                <RenderQuestion
                  question_details={question}
                  index={questionIndex + 1}
                  sectionIndex={sectionIndex + 1}
                  response={studentResponse}
                  marking={marking}
                  UserType="S"
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

export default GetScore;
