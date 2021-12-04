import { mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { ReactSortable } from "react-sortablejs";
import { Button } from "reactstrap";
import DragComponent from "./DragComponent";
import TestQuestionEditor from "./TestQuestionEditor";

const AddQuestion = ({
  section,
  sectionIndex,
  updateQuestionOrder,
  updateQuestion,
  deleteQuestion,
  duplicateQuestion,
  addQuestion,
}) => {
  // const [optionChecked, setOptionchecked] = useState([]);
  return (
    <div className="mt-3">
      <h3>Questions</h3>
      <ReactSortable
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
                // optionChecked={optionChecked}
                // setOptionchecked={setOptionchecked}
              />
            }
            deleteAction={() => deleteQuestion(questionIndex, sectionIndex)}
            duplicateAction={() =>
              duplicateQuestion(questionIndex, sectionIndex)
            }
          />
        ))}
      </ReactSortable>
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
      </div>
    </div>
  );
};

export default AddQuestion;
