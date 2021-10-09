import {
  mdiChevronDown,
  mdiChevronUp,
  mdiContentCopy,
  mdiDelete,
  mdiDragHorizontal,
} from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { Col, Row } from "reactstrap";

const DragComponent = ({ content, deleteAction, duplicateAction }) => {
  return (
    <div
      className="rounded p-3 bg-white my-2"
      style={{ border: "1px solid rgb(0, 0, 0, 0.1)" }}
    >
      <Row>
        <Col md="auto">
          <div
            className="d-flex flex-column align-items-center handle "
            title="Drag Order"
          >
            <Icon
              path={mdiChevronUp}
              size={1.2}
              color="#212529"
              className="hoverPointer d-none d-md-block"
            />
            <Icon
              path={mdiDragHorizontal}
              size={1.2}
              color="#212529"
              className="hoverPointer"
              style={{ transform: "translateY(-50%)" }}
            />
            <Icon
              path={mdiChevronDown}
              size={1.2}
              color="#212529"
              className="hoverPointer d-none d-md-block"
              style={{ transform: "translateY(-100%)" }}
            />
          </div>
        </Col>
        <Col>{content}</Col>
        <Col
          md="auto"
          className="text-right d-flex flex-md-column align-items-center"
        >
          <Icon
            path={mdiDelete}
            size={1.2}
            title="Delete Question"
            color="#212529"
            onClick={deleteAction}
            className="hoverPointer"
          />
          <Icon
            path={mdiContentCopy}
            size={1}
            title="Duplicate Question"
            color="#212529"
            onClick={duplicateAction}
            className="hoverPointer mt-md-2"
          />
        </Col>
      </Row>
    </div>
  );
};

export default DragComponent;
