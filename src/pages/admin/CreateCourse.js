import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import CourseService from "../../services/course.service";

function CreateCourse() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    code: "",
    students: [],
    teachers: [],
    assistants: [],
  });

  const isAdmin = () => {
    // var admin = window.localStorage["user"];
    var admin = JSON.parse(window.localStorage["user"].toString());
    // console.log(admin.name);

    if (admin["type"] === "A") {
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
      assistants: emailArray,
    }));
  };

  const saveCourse = (e, callback) => {
    e.preventDefault();
    CourseService.saveOneCourse(courseData)
      .then((response) => {
        console.log(response);
        console.log("Got here");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-80 d-flex align-items-center justify-content-center">
      {!isAdmin() ? (
        <div>You are not Authorised here</div>
      ) : (
        <div
          className="container-fluid background-white"
          style={{ padding: "15px 30px" }}
        >
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
                  placeholder="Course Description"
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
                  value={courseData.assistants}
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
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}

export default CreateCourse;
