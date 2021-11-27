import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Container } from "reactstrap";
import CourseService from "../../services/course.service";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function CreateCourse() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    code: "",
    students: [],
    teachers: [],
    tas: [],
  });

  // useEffect(() => {
  //   if (id) {
  //     CourseService.getOneCourse(id).then((response) => {
  //       const data = response.data;
  //       setCourseData({
  //         title: data.title,
  //         description: data.description,
  //         code: data.code,
  //         students: data.students,
  //         teachers: data.teachers,
  //         tas: data.tas,
  //       });
  //     });
  //   }
  // });

  const history = useHistory();
  const isAdmin = () => {
    var type = JSON.parse(localStorage["type"].toString());
    // console.log(admin.name);

    if (type === "A" || type === "T") {
      return true;
    } else {
      return false;
    }
  };

  const handleTitle = (e) => {
    const title = e.target.value;
    setCourseData({ ...courseData, title: title });
  };

  const handleDescription = (e) => {
    const description = e.target.value;
    setCourseData({ ...courseData, description: description });
  };

  const handleCode = (e) => {
    setCourseData({ ...courseData, code: e.target.value });
  };

  const handleStudentsAssign = (e) => {
    const emails = e.target.value;

    const emailArray = emails.split(",");
    setCourseData((prevData) => ({
      ...prevData,
      students: emailArray,
    }));
  };
  const handleTeachersAssign = (e) => {
    const emails = e.target.value;

    const emailArray = emails.split(",");
    setCourseData((prevData) => ({
      ...prevData,
      teachers: emailArray,
    }));
  };
  const handleAssistantsAssign = (e) => {
    const emails = e.target.value;

    const emailArray = emails.split(",");
    setCourseData((prevData) => ({
      ...prevData,
      tas: emailArray,
    }));
  };

  const saveCourse = (e, callback) => {
    e.preventDefault();

    CourseService.saveOneCourse(courseData)
      .then((response) => {
        console.log(response);
        console.log("Got here");
        history.push("/allcourses");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container fluid style={{ padding: "15px 30px" }}>
      {!isAdmin() ? (
        <div>You are not Authorised here</div>
      ) : (
        <>
          <div style={{ margin: "10px 15px" }}>
            <h2>Add a Course</h2>
          </div>
          <hr />
          <div className="container-fluid background-white">
            <Form onSubmit={(e) => saveCourse(e)}>
              <div>
                <FormGroup className="mb-4">
                  <Label>Course Title</Label>
                  <Input
                    type="text"
                    name="title"
                    required
                    value={courseData.title}
                    onChange={handleTitle}
                    className="border-primary py-2 w-50"
                    placeholder="Course Title"
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label className="mb-1">Course Description</Label>
                  <Input
                    type="input"
                    required
                    value={courseData.description}
                    onChange={handleDescription}
                    className="border-primary py-2 w-50"
                    placeholder="Course Description"
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label className="mb-1">Course Code</Label>
                  <Input
                    type="input"
                    requiredtextarea
                    value={courseData.code}
                    onChange={handleCode}
                    className="border-primary py-2 w-50"
                    placeholder="Course Code"
                  />
                </FormGroup>

                <FormGroup className="mb-4">
                  <Label className="mb-1">Assign Students</Label>
                  <Input
                    type="textarea"
                    required
                    value={courseData.students}
                    onChange={handleStudentsAssign}
                    className="border-primary py-2 w-50"
                    placeholder="Paste comma separated emails to assign"
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label className="mb-1">Assign Teachers</Label>
                  <Input
                    type="textarea"
                    required
                    value={courseData.teachers}
                    onChange={handleTeachersAssign}
                    className="border-primary py-2 w-50"
                    placeholder="Paste comma separated emails to assign"
                  />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label className="mb-1">Assign Assistants</Label>
                  <Input
                    type="textarea"
                    required
                    value={courseData.tas}
                    onChange={handleAssistantsAssign}
                    className="border-primary py-2 w-50"
                    placeholder="Paste comma separated emails to assign"
                  />
                </FormGroup>
              </div>
              <div className="mt-4 mb-4 mb-lg-5 d-flex">
                <Button
                  // disabled={saving}
                  type="submit"
                  className="ml-3 d-flex align-items-center"
                  color="success"
                >
                  {/* {saving && (
                    <Icon path={mdiLoading} className="spinner mr-2" size={1} />
                  )} */}
                  Save Course
                </Button>
                <Link
                  to="/allcourses"
                  className="ml-3 d-flex align-items-center color-white background-blue "
                >
                  Back to Courses
                </Link>
              </div>
            </Form>
          </div>
        </>
      )}
    </Container>
  );
}

export default CreateCourse;
