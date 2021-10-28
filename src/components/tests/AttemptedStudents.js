import React, { useEffect, useState } from "react";
import TestService from "../../services/test.service";
import { useHistory } from "react-router-dom";
import { Container, Col, Row, Table } from "reactstrap";
import Icon from "@mdi/react";
import { mdiEye, mdiArrowTopRight, mdiLoading } from "@mdi/js";

const AtttemptedStudents = () => {
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
    <Container fluid style={{ padding: "15px 30px" }}>
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student No</th>
            <th>Student Name</th>
            <th>Student Email</th>
            <th>Responses</th>
          </tr>
        </thead>
        <tbody>
          {console.log(studentList)}
          {studentList.map((student, studentIndex) => (
            <tr key={studentIndex}>
              <td>{studentIndex + 1}</td>
              <td>{student.email}</td>
              <td>{student.email}</td>
              <td>
                {student.response ? (
                  <Icon
                    path={mdiArrowTopRight}
                    size={1}
                    className="ml-2 hoverPointer"
                    title="See Responses"
                    onClick={() =>
                      history.push(`/tests/review/${testId}/${student.email}`)
                    }
                  />
                ) : (
                  <div> No Response yet</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AtttemptedStudents;
