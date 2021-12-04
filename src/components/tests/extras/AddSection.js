import React from "react";
import DragComponent from "./DragComponent";
import { Button, FormGroup, Input, Label } from "reactstrap";
import Icon from "@mdi/react";
import { ReactSortable } from "react-sortablejs";
import { mdiPlus } from "@mdi/js";
import AddQuestion from "./AddQuestion";

const AddSection = ({
  components,
  setComponents,
  handleSectionTitle,
  handleSectionDescription,
  updateQuestionOrder,
  updateQuestion,
  deleteQuestion,
  duplicateQuestion,
  addQuestion,
  deleteSection,
  duplicateSection,
  addSection,
}) => {
  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        padding: "0 0 20px 0",
        borderRadius: "10px",
      }}
    >
      {/* {console.log(components)} */}
      <ReactSortable
        list={components}
        setList={setComponents}
        handle=".handle"
        swapThreshold="0.7"
        ghostClass="shadow"
        animation={100}
      >
        {components.map((section, sectionIndex) => (
          <DragComponent
            key={sectionIndex}
            content={
              <div>
                <h3>Section Details</h3>
                <FormGroup className="mb-3">
                  <Label className="mb-0 font-weight-bold">Section Title</Label>
                  <Input
                    type="text"
                    name="title"
                    required
                    value={section.title}
                    onChange={(e) => handleSectionTitle(e, sectionIndex)}
                    className="createSection py-3"
                    placeholder="Section Title"
                  />
                </FormGroup>
                <FormGroup className="mb-3">
                  <Label className="mb-0 font-weight-bold">
                    Section Description
                  </Label>
                  <Input
                    type="textarea"
                    name="testDescription"
                    value={section.data.description}
                    onChange={(e) => handleSectionDescription(e, sectionIndex)}
                    className="createSection py-3"
                    placeholder="Test Description"
                  />
                </FormGroup>
                <AddQuestion
                  section={section}
                  sectionIndex={sectionIndex}
                  updateQuestionOrder={updateQuestionOrder}
                  updateQuestion={updateQuestion}
                  deleteQuestion={deleteQuestion}
                  duplicateQuestion={duplicateQuestion}
                  addQuestion={addQuestion}
                />
                {/* <h3>Questions</h3>
                <div
                  list={section.components}
                  setList={(updatedQuestionOrder) =>
                    updateQuestionOrder(updatedQuestionOrder, sectionIndex)
                  }
                  handle=".handle"
                  swapThreshold="0.7"
                  ghostClass="shadow"
                  animation={100}
                >
                  {section.components.map((questionData, questionIndex) => (
                    <DragComponent
                      key={questionIndex}
                      content={
                        <TestQuestionEditor
                          questionData={questionData}
                          questionIndex={questionIndex}
                          updateQuestion={(data) =>
                            updateQuestion(sectionIndex, questionIndex, data)
                          }
                        />
                      }
                      deleteAction={() =>
                        deleteQuestion(questionIndex, sectionIndex)
                      }
                      duplicateAction={() =>
                        duplicateQuestion(questionIndex, sectionIndex)
                      }
                    />
                  ))}
                </div>
                <div className="text-center mt-4 mb-2">
                  <Button
                    onClick={() => addQuestion(sectionIndex)}
                    outline
                    color="red"
                    className="d-flex align-items-center justify-content-center border-success mx-auto small text-success"
                    size="sm"
                  >
                    <Icon path={mdiPlus} size={1} /> Add a Question
                  </Button>
                </div> */}
              </div>
            }
            deleteAction={() => deleteSection(sectionIndex)}
            duplicateAction={() => duplicateSection(sectionIndex)}
          />
        ))}
      </ReactSortable>
      <div className="text-center mt-4">
        <Button
          onClick={addSection}
          outline
          color="red"
          className="d-flex align-items-center justify-content-center border-success mx-auto small text-success"
          size="sm"
        >
          <Icon path={mdiPlus} size={1} /> Add a Section
        </Button>
      </div>
    </div>
  );
};

export default AddSection;
