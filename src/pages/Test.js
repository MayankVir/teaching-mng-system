import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import {
  mdiDelete,
  mdiEye,
  mdiLoading,
  mdiPencil,
  mdiPlus,
  mdiBook,
  mdiVideo,
} from "@mdi/js";
import { Link, useHistory } from "react-router-dom";
import TestService from "../services/test.service";
import { Col, Row } from "reactstrap";
import "../assets/css/Dashboard.css";
// import GiveTest from "../components/GiveTest";

const Test = () => {
  const [testList, setTestList] = useState([]);
  let history = useHistory();

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(true);
    TestService.getAllTests().then(
      (response) => {
        setTestList(response.data);
        setPageLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  const isAdmin = () => {
    // var admin = window.localStorage["user"];
    var admin = JSON.parse(window.localStorage["user"].toString());
    console.log(admin.name);

    if (admin["type"] === "A") {
      return true;
    } else {
      return false;
    }
  };
  const createNewTest = (e) => {
    e.preventDefault();
    TestService.createOneTest().then(
      (response) => {
        history.push(`/tests/edit/${response.data._id}`);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <div className="pt-3 container-fluid">
        <div className="row smallerScreen">
          <div className="col-12 searchCreateTest">
            <div className="input-group mb-3 search">
              <input
                placeholder="Search Test by Name, Id etc."
                type="text"
                className="bg-white py-3 text-secondary form-control"
                style={{ height: "40px" }}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-light text-dark btn-sm bg-white"
                  style={{
                    border: "1px solid #ced4da",
                    height: "40px",
                    width: "75px",
                  }}
                  type="button"
                >
                  Search
                </button>
              </div>
            </div>
            {isAdmin() ? (
              <Link
                to="/tests/edit/"
                onClick={(e) => createNewTest(e)}
                className="card p-2 mb-3 px-3 border-0 flex-row btn bg-success text-white createTest"
              >
                Create Test <Icon path={mdiPlus} size={1} className="ml-auto" />
              </Link>
            ) : (
              <> </>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {pageLoading ? (
              <div
                className="justify-content-center align-items-end d-flex"
                style={{ minHeight: "200px" }}
              >
                <Icon
                  path={mdiLoading}
                  className="spinner mr-2 text-primary "
                  size={2}
                />
              </div>
            ) : (
              <Row>
                {testList.map((data) => (
                  <Col lg="6" key={data._id}>
                    <div
                      className="card p-3 my-2 flex-row text-dark"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div>
                        <h5 className="mb-2 font-weight-bold">{data.title}</h5>
                        <p className="small mb-0">
                          <b>Created On:</b> {data.createdAt.split("T")[0]},{" "}
                          {data.createdAt.split("T")[1].substring(0, 5)}
                        </p>
                        <p className="small mb-0">
                          <b>Last Updated:</b> {data.updatedAt.split("T")[0]},{" "}
                          {data.updatedAt.split("T")[1].substring(0, 5)}
                        </p>
                      </div>
                      <div className="ml-auto text-dark">
                        {isAdmin() ? (
                          <div>
                            <Icon
                              path={mdiBook}
                              size={1}
                              className=" hoverPointer"
                              title="Give scores and reviews"
                              onClick={() =>
                                history.push(`/tests/students/${data._id}`)
                              }
                              style={{ cursor: "pointer" }}
                            />
                            <Icon
                              path={mdiPencil}
                              size={1}
                              className=" hoverPointer"
                              title="Edit Test"
                              onClick={() =>
                                history.push(`/tests/edit/${data._id}`)
                              }
                              style={{ cursor: "pointer" }}
                            />
                            <Icon
                              path={mdiEye}
                              size={1}
                              className="ml-2 hoverPointer"
                              title="Preview Test"
                              onClick={() =>
                                history.push(`/tests/preview/${data._id}`)
                              }
                              style={{ cursor: "pointer" }}
                            />
                            <Icon
                              path={mdiDelete}
                              size={1}
                              className="ml-2 hoverPointer"
                              title="Delete Test"
                              onClick={() =>
                                history.push(`/tests/delete/${data._id}`)
                              }
                              style={{ cursor: "pointer" }}
                            />
                            <Icon
                              path={mdiVideo}
                              size={1}
                              className="ml-2 hoverPointer"
                              title="Monitor test"
                              onClick={() =>
                                history.push(`/tests/videomonitor/${data._id}`)
                              }
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        ) : (
                          <div>
                            <Icon
                              path={mdiEye}
                              size={1}
                              className="ml-2 hoverPointer"
                              title="Get Scores  and reviews"
                              onClick={() =>
                                history.push(`/tests/response/${data._id}`)
                              }
                              style={{ cursor: "pointer" }}
                            />
                            <Icon
                              path={mdiBook}
                              size={1}
                              className="ml-2 hoverPointer"
                              title="Give test"
                              onClick={() =>
                                history.push(`/tests/giveTest/${data._id}`)
                              }
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
