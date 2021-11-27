import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Table } from "reactstrap";
import CourseService from "../../services/course.service";
// import Courses from "./db.json";

const ViewCourse = () => {
  const { id } = useParams();
  const [Course, setCourse] = useState({
    id: "",
    title: "",
    description: "",
    code: "",
    students: [],
    teachers: [],
    tas: [],
  });
  useEffect(() => {
    CourseService.getOneCourse(id)
      .then(async (response) => {
        console.log(response);
        await setCourse({
          id: response.data._id,
          title: response.data.title,
          description: response.data.description,
          code: response.data.code,
          students: response.data.students,
          teachers: response.data.teachers,
          tas: response.data.tas,
        });
        console.log(Course);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container fluid style={{ padding: "15px 30px" }}>
      <div>
        <h2>Title: {Course.title}</h2>
        <h3>Description: {Course.description}</h3>
        <h4>Course Code: {Course.code}</h4>
        <hr />
        {console.log(Course)}
        <div className="d-flex justify-content-around">
          <div
            className="border border-dark d-flex flex-column align-items-center"
            style={{ width: "30%" }}
          >
            <h5 style={{ margin: "10px 0" }}>STUDENTS</h5>
            <hr style={{ width: "80%", margin: "0" }} />
            <div style={{ margin: "8px 0" }}>
              {Course.students.map((student, idx) => {
                return (
                  <p key={`student-${idx}`} style={{ margin: "2px 0" }}>
                    {student}
                  </p>
                );
              })}
            </div>
          </div>
          <div
            className="border border-dark d-flex flex-column align-items-center"
            style={{ width: "30%" }}
          >
            <h5 style={{ margin: "10px 0" }}>TEACHERS</h5>
            <hr style={{ width: "80%", margin: "0" }} />
            <div style={{ margin: "8px 0" }}>
              {Course.teachers.map((teacher, idx) => {
                return (
                  <p key={`teacher-${idx}`} style={{ margin: "2px 0" }}>
                    {teacher.email}
                  </p>
                );
              })}
            </div>
          </div>
          <div
            className="border border-dark d-flex flex-column align-items-center"
            style={{ width: "30%" }}
          >
            <h5 style={{ margin: "10px 0" }}>TAs</h5>
            <hr style={{ width: "80%", margin: "0" }} />
            <div style={{ margin: "8px 0" }}>
              {Course.tas.map((ta, idx) => {
                return (
                  <p key={`ta-${idx}`} style={{ margin: "2px 0" }}>
                    ta
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ViewCourse;
