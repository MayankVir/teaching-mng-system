import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import TestService from "../../services/test.service";
import { Redirect, useHistory } from "react-router-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import AddSection from "./extras/AddSection";
import "../common/Common.css";
import { toast } from "react-toast";
import CourseService from "../../services/course.service";

const CreateTest = (props) => {
  //   const { control, register, handleSubmit } = useForm();
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
  const [isCourseSelected, setIsCourseSelected] = useState(false);
  const [CourseList, setCourseList] = useState([]);
  const [testData, setTestData] = useState({
    course: null,
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

  const [pageLoading, setPageLoading] = useState(true);

  let history = useHistory();

  const testId =
    history.location.pathname.split("/").length === 4
      ? history.location.pathname.split("/").pop()
      : null;

  useEffect(() => {
    setPageLoading(true);
    CourseService.getAllCourses().then((res) => setCourseList(res.data));
    TestService.getOneTest(testId).then(
      (response) => {
        console.log(response.data);
        setTestData({
          course: response.data.course ? response.data.course : null,
          title: response.data.title ? response.data.title : "",
          data: {
            description: "",
            duration: { start: new Date(), end: new Date() },
            assign: [],
            ...response.data.data,
          },
        });
        setPageLoading(false);
        setComponents(response.data.components ? response.data.components : []);
      },
      (error) => {
        return <Redirect to="/dashboard" />;
      }
    );
  }, [testId]);

  const previewTest = (e) => {
    saveTest(e, () => {
      history.push(`/tests/preview/${testId}`);
    });
  };
  const deleteTest = (e) => {
    saveTest(e, () => {
      history.push(`/tests/delete/${testId}`);
    });
  };

  const saveTest = (event, callback) => {
    event.preventDefault();
    setSaving(true);
    TestService.saveOneTest({ ...testData, components: components }, testId)
      .then((result) => {
        const emails = testData.data.assign;
        console.log(result);
        toast.success("Test Created Successfully");
        TestService.assignEmail(emails, testId)
          .then(
            (response) => {
              console.log(response);
              setSaving(false);
              if (callback) callback();
            },
            (error) => {
              setSaving(false);
            }
          )
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => console.log(err));
  };

  const deleteSection = (sectionIndex) => {
    const _components = [...components];
    _components.splice(sectionIndex, 1);
    setComponents(_components);
  };

  const duplicateSection = (sectionIndex) => {
    const _components = [...components];
    _components.splice(sectionIndex + 1, 0, {
      ...components[sectionIndex],
      title: components[sectionIndex].title + " - copy",
    });
    setComponents(_components);
  };

  const deleteQuestion = (questionIndex, sectionIndex) => {
    const _components = [...components];
    _components[sectionIndex].components.splice(questionIndex, 1);
    setComponents(_components);
  };

  const duplicateQuestion = (questionIndex, sectionIndex) => {
    const _components = [...components];
    _components[sectionIndex].components.splice(questionIndex + 1, 0, {
      ...components[sectionIndex].components[questionIndex],
      question:
        components[sectionIndex].components[questionIndex].question + " - copy",
    });
    setComponents(_components);
  };

  const addSection = () => {
    setComponents([
      ...components,
      {
        title: "",
        startTime: "",
        data: {
          description: "",
        },
        components: [],
      },
    ]);
  };

  const addQuestion = (sectionIndex) => {
    const _components = [...components];
    _components[sectionIndex].components = [
      ...components[sectionIndex].components,
      {
        id: 0,
        type: "descriptive",
        question: "",
        options: null,
        isRequired: false,
        questionFiles: null,
        ansFileType: "Any",
        score: 0,
        review: "",
        ans_mcq: [],
        optionType: "radio",
      },
    ];
    setComponents(_components);
  };

  const handleTitle = (event) => {
    setTestData({ ...testData, title: event.target.value });
  };

  const handleDescription = (event) => {
    setTestData({
      ...testData,
      data: { ...testData.data, description: event.target.value },
    });
  };

  const handleSectionTitle = (event, sectionIndex) => {
    const _components = [...components];
    _components[sectionIndex].title = event.target.value;
    setComponents(_components);
  };

  const handleSectionDescription = (event, sectionIndex) => {
    const _components = [...components];
    _components[sectionIndex].data.description = event.target.value;
    setComponents(_components);
  };

  const updateQuestionOrder = (updatedQuestionOrder, sectionIndex) => {
    const _components = [...components];
    _components[sectionIndex].components = updatedQuestionOrder;
    setComponents(_components);
  };

  const updateQuestion = (sectionIndex, questionIndex, data) => {
    const _components = [...components];
    _components[sectionIndex].components[questionIndex] = data;
    setComponents(_components);
  };

  const handleDurationStart = (event) => {
    const start = event._d.getTime();
    console.log(event._d);
    setTestData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        duration: { ...prevData.data.duration, start: start },
      },
    }));
  };

  const handleDurationEnd = (event) => {
    const end = event._d.getTime();
    setTestData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        duration: { ...prevData.data.duration, end: end },
      },
    }));
  };

  const handleAssign = (event) => {
    const emails = event.target.value;

    const emailArray = emails.split(",");
    setTestData((prevData) => ({
      ...prevData,
      data: { ...prevData.data, assign: emailArray },
    }));
  };

  const isAdmin = () => {
    var type = JSON.parse(localStorage["priksha_type"].toString());
    // console.log(admin.name);

    if (type === "A") {
      return true;
    } else {
      return false;
    }
  };
  const isTeacher = () => {
    var type = JSON.parse(localStorage["priksha_type"].toString());
    // console.log(admin.name);

    if (type === "T") {
      return true;
    } else {
      return false;
    }
  };

  const handleCourseSelected = (e) => {
    if (e.target.value === "default") {
      setIsCourseSelected(false);
      setTestData({
        ...testData,
        course: null,
      });
    } else {
      setIsCourseSelected(true);
      setTestData({
        ...testData,
        course: e.target.value,
      });
    }
    console.log(e.target.value);
  };

  return (
    <div>
      {!isAdmin() && !isTeacher() ? (
        <div>You are not Authorised here</div>
      ) : (
        <>
          {/* <hr /> */}
          <div className="bg-white">
            <div
              className="container-fluid"
              style={{ padding: "15px 10%", background: "#F2F3F7" }}
            >
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
                    <h2
                      style={{
                        textAlign: "center",
                        textDecoration: "underline",
                      }}
                    >
                      Test Details
                    </h2>
                  )}
                </div>
              </div>
              {!pageLoading && (
                <Form onSubmit={(e) => saveTest(e)}>
                  <div>
                    <FormGroup className="mb-4">
                      <Label>
                        <h4>Test Title</h4>
                      </Label>
                      <Input
                        type="text"
                        name="title"
                        required
                        value={testData.title}
                        onChange={handleTitle}
                        className="createTitle p-10"
                        placeholder="Test Title"
                      />
                    </FormGroup>
                    <FormGroup className="mb-4">
                      <Label>
                        <h4>Test Description</h4>
                      </Label>
                      <Input
                        type="textarea"
                        required
                        value={testData.data.description}
                        onChange={handleDescription}
                        className="createTitle p-10"
                        placeholder="Test Description"
                      />
                      <FormGroup className="mt-4">
                        <Label>
                          <h4>Test Duration</h4>
                        </Label>
                        <div
                          className="smallerScreenTest d-flex justify-content-between"
                          style={{ width: "75%" }}
                        >
                          <div>
                            <Label className=" mb-0">
                              <h6>Start Date & Time</h6>
                            </Label>
                            <Datetime
                              className="w-30"
                              inputProps={{
                                className: "createTitle",
                                placeholder: "Start Date & Time",
                              }}
                              value={new Date(testData.data.duration.start)}
                              onChange={handleDurationStart}
                              // className=""
                            />
                          </div>
                          <div>
                            <Label className=" mb-0">
                              <h6>End Date & Time</h6>
                            </Label>
                            <Datetime
                              className="w-30"
                              inputProps={{
                                className: "createTitle",
                                placeholder: "End Date & Time",
                              }}
                              value={new Date(testData.data.duration.end)}
                              onChange={handleDurationEnd}
                            />
                          </div>
                        </div>
                      </FormGroup>
                    </FormGroup>

                    <FormGroup className="mt-4">
                      <Label className="text-decoration-underline">
                        <h4>Assign students/Select any Course</h4>
                      </Label>
                      <Row>
                        <Col style={{ flex: 1 }}>
                          <Row>
                            <h6 className="mb-3 mt-1">Select any course</h6>
                            <select
                              name="courses"
                              id="courses"
                              className="form-control h-100"
                              // style={{ padding: "0 15px" }}
                              onChange={handleCourseSelected}
                            >
                              <option value="default">Select any course</option>
                              {CourseList.map((course) => {
                                return (
                                  <option
                                    key={course._id}
                                    value={course._id}
                                    selected={
                                      testData.course === course._id
                                        ? true
                                        : false
                                    }
                                  >{`${course.title} (${course.code})`}</option>
                                );
                              })}
                            </select>
                          </Row>
                        </Col>
                        <Col
                          style={{
                            flex: 0,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          <h3>OR</h3>
                        </Col>
                        <Col>
                          <Label className="mb-0">
                            <h6>Assign Test</h6>
                          </Label>
                          <Input
                            type="textarea"
                            required
                            value={testData.data.assign}
                            onChange={handleAssign}
                            className="createTitle py-3"
                            placeholder="Paste comma se parated emails to assign"
                            disabled={isCourseSelected}
                          />
                        </Col>
                      </Row>
                    </FormGroup>

                    <h3 className="mt-4">Test Structure</h3>
                    <p
                      className="text-secondary mb-0"
                      style={{ opacity: "0.5" }}
                    >
                      Add your own questions with fields for the test.
                    </p>
                  </div>
                  <AddSection
                    components={components}
                    setComponents={setComponents}
                    handleSectionTitle={handleSectionTitle}
                    handleSectionDescription={handleSectionDescription}
                    updateQuestionOrder={updateQuestionOrder}
                    updateQuestion={updateQuestion}
                    deleteQuestion={deleteQuestion}
                    duplicateQuestion={duplicateQuestion}
                    addQuestion={addQuestion}
                    deleteSection={deleteSection}
                    duplicateSection={duplicateSection}
                    addSection={addSection}
                  />
                  <div className="my-5 mb-lg-5 d-flex justify-content-between">
                    <Button onClick={(e) => previewTest(e)} color="primary">
                      Preview Test
                    </Button>
                    <Button
                      disabled={saving}
                      type="submit"
                      className="ml-3 w-25 d-flex align-items-center justify-content-center"
                      color="success"
                    >
                      {saving && (
                        <Icon
                          path={mdiLoading}
                          className="spinner mr-2"
                          size={1}
                        />
                      )}
                      Save Test
                    </Button>
                    <Button
                      onClick={(e) => deleteTest(e)}
                      className="ml-auto"
                      color="danger"
                    >
                      Delete Test
                    </Button>
                  </div>
                </Form>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateTest;
