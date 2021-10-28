import React from "react";
import { Container, Col, Row, Table } from "reactstrap";
function Courses() {
  return (
    <Container fluid style={{ padding: "15px 60px" }}>
      <Row>
        <Col className="ml-3" md="9">
          <Row>
            <h2 className="mt-3 font-weight-bold text-dark mb-0">
              Courses Assigned
            </h2>
          </Row>
        </Col>
      </Row>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course No</th>
            <th>Course Name</th>
            <th>Course Department</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CST - 310</td>
            <td>Software Engineering</td>
            <td>CSE</td>
          </tr>
          <tr>
            <td>CST - 311</td>
            <td>Computer Networks</td>
            <td>CSE</td>
          </tr>
          <tr>
            <td>CST - 312</td>
            <td>Database Management System</td>
            <td>CSE</td>
          </tr>
          <tr>
            <td>CST - 313</td>
            <td>Operating System</td>
            <td>CSE</td>
          </tr>
          <tr>
            <td>CST - 314</td>
            <td>Mathematics I</td>
            <td>CSE</td>
          </tr>
          <tr>
            <td>CST - 315</td>
            <td>Machine Learning</td>
            <td>CSE</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default Courses;
