import { mdiAlertCircleOutline, mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import TestService from "../../../services/test.service";
import { Redirect, useHistory } from "react-router-dom";

const DeleteTest = () => {
  const [deleting, setDeleting] = useState(false);
  const [testData, setTestData] = useState({
    title: "",
    data: {
      description: "",
    },
  });

  let history = useHistory();

  const testId =
    history.location.pathname.split("/").length === 4
      ? history.location.pathname.split("/").pop()
      : null;

  useEffect(() => {
    TestService.getOneTest(testId).then(
      (response) => {
        setTestData({
          title: response.data.title ? response.data.title : "",
          data: { description: "", ...response.data.data },
        });
      },
      (error) => {
        return <Redirect to="/dashboard" />;
      }
    );
  }, [testId]);

  const goBack = () => {
    history.push("/tests");
  };

  const deleteTest = (event) => {
    event.preventDefault();
    setDeleting(true);
    TestService.deleteOneTest(testId).then(
      (response) => {
        setDeleting(false);
        goBack();
      },
      (error) => {
        setDeleting(false);
      }
    );
  };

  return (
    <div className="container-fluid h-100">
      <div className="row pt-3 h-100">
        <div className="col d-flex align-items-center justify-content-center">
          <div className="card p-4 p-lg-5 rounded shadow text-center">
            <div>
              <Icon
                size={2}
                path={mdiAlertCircleOutline}
                className="text-danger mb-2"
              />
            </div>
            <h3>Are you sure you want to delete?</h3>
            <p className="text-center text-muted">
              You are going to delete test titled: {testData.title}
              <br />
              <span className="text-danger">
                Note: This action is not reversable!
              </span>
            </p>
            <div className="d-flex mt-3">
              <Button color="success" onClick={goBack}>
                Go Back
              </Button>
              <Button
                color="danger"
                disabled={deleting}
                className="ml-auto d-flex align-items-center"
                onClick={deleteTest}
              >
                {deleting && (
                  <Icon path={mdiLoading} className="spinner mr-2" size={1} />
                )}
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTest;
