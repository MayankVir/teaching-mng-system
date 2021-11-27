import { mdiAlertCircleOutline, mdiLoading } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button } from "reactstrap";
import CourseService from "../../services/course.service";

const DeleteCourse = () => {
  const { id } = useParams();
  const [deleting, setDeleting] = useState(false);
  const history = useHistory();
  useEffect(() => {
    // CourseService.deleteOneCourse(id)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  const goBack = () => {
    history.push("/allcourses");
  };

  const deleteCourse = async () => {
    setDeleting(true);
    await CourseService.deleteOneCourse(id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    setDeleting(false);
    goBack();
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
            <h3>Are you sure you want to delete the Course?</h3>
            <p className="text-center text-muted">
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
                onClick={deleteCourse}
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

export default DeleteCourse;
