import { mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import TestService from "../../services/test.service";
import { Redirect, useHistory } from "react-router-dom";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import AddSection from "./extras/AddSection";
// import DatePicker from "react-datepicker";
// import { DateTime } from "react-datetime-bootstrap";
// import "react-datepicker/dist/react-datepicker.css";

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

  const [pageLoading, setPageLoading] = useState(true);

  let history = useHistory();

  const testId =
    history.location.pathname.split("/").length === 4
      ? history.location.pathname.split("/").pop()
      : null;

  useEffect(() => {
    setPageLoading(true);
    TestService.getOneTest(testId).then(
      (response) => {
        setTestData({
          title: response.data.title ? response.data.title : "",
          data: {
            description: "",
            duration: { hours: 0, minutes: 0 },
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
        console.log(emails);
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
    console.log(event._d.getTime());
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
  return (
    <div className="container-fluid">
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
            <h3>Test Details</h3>
          )}
        </div>
      </div>
      {!pageLoading && (
        <Form onSubmit={(e) => saveTest(e)}>
          <div>
            <FormGroup className="mb-3">
              <Label>Test Title</Label>
              <Input
                type="text"
                name="title"
                required
                value={testData.title}
                onChange={handleTitle}
                className="border-primary py-3"
                placeholder="Test Title"
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label className="mb-0">Test Description</Label>
              <Input
                type="textarea"
                required
                value={testData.data.description}
                onChange={handleDescription}
                className="border-primary py-3"
                placeholder="Test Description"
              />
              <FormGroup>
                <Label>Test Duration</Label>
                <div className="d-flex justify-content-between w-50">
                  <div>
                    <Label className="mt-3 mb-0">Start Date & Time</Label>
                    <Datetime
                      className="w-30"
                      inputProps={{ placeholder: "Start Date & Time" }}
                      value={new Date(testData.data.duration.start)}
                      onChange={handleDurationStart}
                    />
                  </div>
                  <div>
                    <Label className="mt-3 mb-0">End Date & Time</Label>
                    <Datetime
                      className="w-30"
                      inputProps={{ placeholder: "End Date & Time" }}
                      value={new Date(testData.data.duration.end)}
                      onChange={handleDurationEnd}
                    />
                  </div>
                </div>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <Label className="mb-0">Assign Test</Label>
              <Input
                type="textarea"
                required
                value={testData.data.assign}
                onChange={handleAssign}
                className="border-primary py-3"
                placeholder="Paste comma separated emails to assign"
              />
            </FormGroup>

            <h3 className="mt-4">Test Structure</h3>
            <p className="text-secondary mb-0" style={{ opacity: "0.5" }}>
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
          <div className="mt-4 mb-3 mb-lg-5 d-flex">
            <Button onClick={(e) => previewTest(e)} color="primary">
              Preview Test
            </Button>
            <Button
              disabled={saving}
              type="submit"
              className="ml-3 d-flex align-items-center"
              color="success"
            >
              {saving && (
                <Icon path={mdiLoading} className="spinner mr-2" size={1} />
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
  );
};

export default CreateTest;
