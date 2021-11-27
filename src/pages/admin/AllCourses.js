import { mdiLoading, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Container, Row, Table } from "reactstrap";
import CourseService from "../../services/course.service.js";
import UserService from "../../services/user.service.js";
import { mdiPencil, mdiDelete } from "@mdi/js";
const AllCourses = () => {
  let history = useHistory();
  const [AllCourses, setAllCourses] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [teachersList, setTeachersList] = useState([]);

  useEffect(() => {
    // console.log(CourseService);
    setPageLoading(true);
    CourseService.getAllCourses().then((response) => {
      setAllCourses(response.data);
      setPageLoading(false);
      console.log(response.data);
    });
    UserService.getAllUsers()
      .then((response) => {
        const teachers = response.data.filter((each) => each.type === "T");
        setTeachersList(teachers);
      })
      .catch((err) => console.log(err));
  }, []);

  const isAdmin = () => {
    var type = JSON.parse(localStorage["type"].toString());
    // console.log(admin.name);

    if (type === "A") {
      return true;
    } else {
      return false;
    }
  };
  const deleteCourse = (id) => {
    history.push(`/allcourses/delete/${id}`);
  };

  // const editCourse = (id) => {
  //   history.push(`/createcourse/${id}`);
  // };

  const displaySpecificCourses = async (e) => {
    e.preventDefault();
    console.log("here");
    console.log(e.target.value);
    setPageLoading(true);
    let totalData;
    await CourseService.getAllCourses().then((response) => {
      totalData = response.data;
    });
    if (e.target.value === "default") {
      CourseService.getAllCourses().then((response) => {
        setAllCourses(totalData);
      });
    } else {
      const teacherCourses = totalData.filter((course) => {
        const list = course.teachers.filter(
          (teacher) => teacher._id === e.target.value
        );
        console.log(list);
        if (list.length > 0) return true;
        else return false;
      });
      setAllCourses(teacherCourses);
      console.log(teacherCourses);
    }
    setPageLoading(false);
  };
  return (
    <>
      <Container fluid style={{ padding: "15px 30px" }}>
        <Row>
          <Col className="ml-3" md="10">
            <Row>
              <h2 className="mt-3 font-weight-bold text-dark mb-0">
                All Courses
              </h2>
            </Row>
          </Col>
          <Col className="ml-3 mt-3">
            <Link
              to="/createcourse"
              // onClick={(e) => createNewTest(e)}
              className="card flex-row btn bg-success text-white justify-content-center"
            >
              Create Course <Icon path={mdiPlus} size={1} className="ml-auto" />
            </Link>
          </Col>
        </Row>
        {/* <Row>
          <select>
            
            <option>Select a teacher</option>
          </select>
        </Row> */}
        <hr />
        {isAdmin() ? (
          <>
            <div>Filter by teacher:</div>
            <select
              name="teacherList"
              id="teachers"
              onChange={displaySpecificCourses}
              style={{ width: "25%" }}
            >
              <option value="default" selected>
                All
              </option>
              {teachersList.map((teacher) => {
                return (
                  <option
                    value={`${teacher._id}`}
                  >{`${teacher.name} (${teacher.email})`}</option>
                );
              })}
            </select>
          </>
        ) : (
          <> </>
        )}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Course Description</th>
              <th>No of Students</th>
              <th>No of Teachers</th>
              <th>No of TAs</th>
              <th>View Course</th>
              <th>Edit or Delete</th>
            </tr>
          </thead>
          <tbody>
            {pageLoading ? (
              <div
                className="justify-content-center align-items-center d-flex"
                // style={{ minHeight: "200px" }}
              >
                <Icon
                  path={mdiLoading}
                  className="spinner mr-2 text-primary "
                  size={2}
                />
              </div>
            ) : (
              <>
                {AllCourses.length > 0 ? (
                  AllCourses.map((course) => {
                    return (
                      <tr key={course._id}>
                        <td>{course.code}</td>
                        <td>{course.title}</td>
                        <td>{course.description}</td>
                        <td>{course.students.length}</td>
                        <td>{course.teachers.length}</td>
                        <td>{course.tas.length}</td>
                        <td>
                          <Link to={`/allcourses/${course._id}`}>
                            View Course
                          </Link>
                        </td>
                        <td className="d-flex justify-content-around">
                          <Icon
                            path={mdiPencil}
                            size={1}
                            style={{ cursor: "pointer" }}
                            // onClick={() => editCourse(course._id)}
                          />{" "}
                          |{" "}
                          <Icon
                            style={{ cursor: "pointer" }}
                            path={mdiDelete}
                            size={1}
                            onClick={() => deleteCourse(course._id)}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <h4
                    style={{
                      position: "absolute",
                      width: "100%",
                      textAlign: "center",
                      margin: "20px 0",
                    }}
                  >
                    No Courses assigned to this teacher
                  </h4>
                )}
              </>
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default AllCourses;
