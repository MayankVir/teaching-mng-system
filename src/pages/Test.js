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
import UserService from "../services/user.service";
// import GiveTest from "../components/GiveTest";

const Test = () => {
  const [testList, setTestList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  let history = useHistory();

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(true);
    TestService.getAllTests().then(
      (response) => {
        console.log(response.data);
        setTestList(response.data);
        console.log(response.data);
        setPageLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    UserService.getAllUsers()
      .then((response) => {
        const teachers = response.data.filter((each) => each.type === "T");
        setTeachersList(teachers);
      })
      .catch((err) => console.log(err));
  }, []);

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
  const isAssistant = () => {
    var type = JSON.parse(localStorage["priksha_type"].toString());
    // console.log(admin.name);

    if (type === "TA") {
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
  const displaySpecificTests = async (e) => {
    e.preventDefault();
    console.log("here");
    setPageLoading(true);
    let totalData;
    await TestService.getAllTests().then(
      (response) => {
        totalData = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
    if (e.target.value === "default") {
      setTestList(totalData);
    } else {
      const teacherTests = totalData.filter(
        (eachTest) => eachTest.created_By === e.target.value
      );
      setTestList(teacherTests);
      console.log(teacherTests);
    }
    setPageLoading(false);
  };

  return (
    <>
      <div className="pt-3 container-fluid" style={{ padding: "15px 30px" }}>
        <div className="row smallerScreen">
          <div className="searchCreateTest">
            {isAdmin() || isTeacher() || isAssistant() ? (
              <>
                {isAdmin() ? (
                  <div className="mx-2">
                    <div>Filter by teacher:</div>
                    <select
                      name="teacherList"
                      id="teachers"
                      className="form-control"
                      onChange={displaySpecificTests}
                      style={{ width: "100%" }}
                    >
                      <option value="default" selected>
                        All
                      </option>
                      {teachersList.map((teacher) => {
                        return (
                          <option
                            value={teacher._id}
                            key={teacher._id}
                            style={{ padding: "2px 0" }}
                          >{`${teacher.name} (${teacher.email})`}</option>
                        );
                      })}
                    </select>
                  </div>
                ) : (
                  <> </>
                )}
                <Link
                  to="/tests/edit/"
                  onClick={(e) => createNewTest(e)}
                  className="card p-2  px-3 border-0 flex-row btn bg-dark text-white createTest"
                >
                  Create Test{" "}
                  <Icon path={mdiPlus} size={1} className="ml-auto" />
                </Link>
              </>
            ) : (
              <> </>
            )}
          </div>
        </div>
        <hr />
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
                {testList.length > 0 ? (
                  testList.map((data) => (
                    <Col
                      lg="6"
                      key={data._id}
                      // onClick={() => history.push(`/tests/preview/${data._id}`)}
                    >
                      <div
                        className="card p-3 my-3 mx-1 flex-row text-dark hoveringTest"
                        style={{
                          justifyContent: "space-between",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            flexDirection: "column",
                          }}
                        >
                          <div>
                            <h5 className="mb-2 font-weight-bold">
                              Title: <b>{data.title ? data.title : ""} </b>
                            </h5>
                            <h6 className="mb-2 font-weight-bold">
                              <b>
                                {" "}
                                {data.data && data.data.description
                                  ? data.data.description
                                  : ""}
                              </b>
                            </h6>
                          </div>

                          <div>
                            <p className="small mb-0">
                              <b>Created On:</b> {data.createdAt.split("T")[0]},{" "}
                              {data.createdAt.split("T")[1].substring(0, 5)}
                            </p>
                            <p className="small mb-0">
                              <b>Last Updated:</b>{" "}
                              {data.updatedAt.split("T")[0]},{" "}
                              {data.updatedAt.split("T")[1].substring(0, 5)}
                            </p>
                          </div>
                        </div>
                        <div className="ml-auto text-dark">
                          {isAdmin() || isTeacher() || isAssistant() ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                onClick={() =>
                                  history.push(`/tests/students/${data._id}`)
                                }
                                style={{ cursor: "pointer" }}
                                className="testOptions"
                              >
                                <div className="testOptionsText">
                                  Give scores and reviews
                                </div>
                                <Icon
                                  path={mdiBook}
                                  size={1}
                                  className="hoverPointer"
                                  title="Give scores and reviews"
                                />
                              </div>
                              <div
                                className="testOptions"
                                onClick={() =>
                                  history.push(`/tests/edit/${data._id}`)
                                }
                              >
                                <div className="testOptionsText">Edit Test</div>
                                <Icon
                                  path={mdiPencil}
                                  size={1}
                                  className="hoverPointer"
                                  title="Edit Test"
                                  style={{ cursor: "pointer" }}
                                />
                              </div>

                              <div
                                className="testOptions"
                                onClick={() =>
                                  history.push(`/tests/preview/${data._id}`)
                                }
                              >
                                <div className="testOptionsText">
                                  Preview Test
                                </div>
                                <Icon
                                  path={mdiEye}
                                  size={1}
                                  className="ml-2 hoverPointer"
                                  title="Preview Test"
                                  style={{ cursor: "pointer" }}
                                />
                              </div>

                              <div
                                className="testOptions"
                                onClick={() =>
                                  history.push(`/tests/delete/${data._id}`)
                                }
                              >
                                <div className="testOptionsText">
                                  Delete Test
                                </div>
                                <Icon
                                  path={mdiDelete}
                                  size={1}
                                  className="ml-2 hoverPointer"
                                  title="Delete Test"
                                  style={{ cursor: "pointer" }}
                                />
                              </div>

                              <div
                                className="testOptions"
                                onClick={() =>
                                  history.push(
                                    `/tests/videomonitor/${data._id}`
                                  )
                                }
                              >
                                <div className="testOptionsText">
                                  Monitor Test
                                </div>
                                <Icon
                                  path={mdiVideo}
                                  size={1}
                                  className="ml-2 hoverPointer"
                                  title="Monitor test"
                                  style={{ cursor: "pointer" }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div
                                className="testOptions"
                                onClick={() =>
                                  history.push(`/tests/response/${data._id}`)
                                }
                              >
                                <div className="testOptionsText">
                                  Get Scores and reviews
                                </div>
                                <Icon
                                  path={mdiEye}
                                  size={1}
                                  className="ml-2 hoverPointer"
                                  title="Get Scores and reviews"
                                  style={{ cursor: "pointer" }}
                                />
                              </div>
                              {new Date().getTime() <
                              new Date(data.data.duration.end).getTime() ? (
                                <div
                                  className="testOptions"
                                  onClick={() =>
                                    history.push(`/tests/giveTest/${data._id}`)
                                  }
                                >
                                  <div className="testOptionsText">
                                    Give test
                                  </div>
                                  <Icon
                                    path={mdiBook}
                                    size={1}
                                    className="ml-2 hoverPointer"
                                    title="Give test"
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </Col>
                  ))
                ) : (
                  <h3
                    style={{
                      // position: "absolute",
                      width: "100%",
                      textAlign: "center",
                      margin: "50px 0",
                    }}
                  >
                    No Tests to show for this teacher
                  </h3>
                )}
              </Row>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
