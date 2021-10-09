import React, { useEffect, useState } from "react";
import TestService from "../../services/test.service";
import { useHistory } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff, mdiLoading } from "@mdi/js";

const GiveScore = () => {
  var [studentList, setStudentList] = useState([]);
  let history = useHistory();
  const [pageLoading, setPageLoading] = useState(true);

  const testId =
    history.location.pathname.split("/").length === 4
      ? history.location.pathname.split("/").pop()
      : null;

  useEffect(() => {
    setPageLoading(true);
    TestService.getAssignedUsers(testId).then(
      (response) => {
        console.log(response.data);
        console.log(typeof response.data);

        setStudentList(response.data);
        setPageLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [testId]);

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

  console.log(studentList);
  return (
    <Container fluid>
      <Row>
        <Col className="ml-3" md="9">
          <Row>
            <h2 className="mt-3 font-weight-bold text-dark mb-0">
              All the students assigned this test :{" "}
            </h2>
          </Row>
        </Col>
      </Row>
      <hr />
      {studentList.map((student, studentIndex) => (
        <Container
          key={studentIndex}
          className="bg-white rounded p-4 p-lg-5 shadow-sm mt-4"
          fluid
        >
          <div>{student.email}</div>
          {student.response ? (
            <Icon
              path={mdiEye}
              size={1}
              className="ml-2 hoverPointer"
              title="See Responses"
              onClick={() =>
                history.push(`/tests/review/${testId}/${student.email}`)
              }
            />
          ) : (
            <Icon
              path={mdiEyeOff}
              size={1}
              className="ml-2 hoverPointer"
              title="No response yet"
              onClick={() => alert("No reponse given yet")}
            />
          )}
        </Container>
      ))}
    </Container>
  );
};

export default GiveScore;
