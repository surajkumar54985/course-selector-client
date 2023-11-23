import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile,
} from "mdb-react-ui-kit";

const AdminDashBoard = () => {
  const [cname, setCname] = useState("");
  const [psub, setPsub] = useState("");
  const [csub, setCsub] = useState("");
  const [Prov, setProv] = useState("");
  const [coll, setColl] = useState("");
  const AdminId = localStorage.getItem("AdminId");

  const navigate = useNavigate();

  const onCnameChangeHandler = (e) => {
    e.preventDefault();
    setCname(e.target.value);
  };
  const onPsubnameChangeHandler = (e) => {
    e.preventDefault();
    setPsub(e.target.value.toLowerCase());
  };
  const onCsubnameChangeHandler = (e) => {
    e.preventDefault();
    setCsub(e.target.value);
  };
  const onProvChangeHandler = (e) => {
    e.preventDefault();
    setProv(e.target.value);
  };
  const onCollChangeHandler = (e) => {
    e.preventDefault();
    setColl(e.target.value);
  };
  const formHandler = (e) => {
    e.preventDefault();
    if (cname == "" || cname == null) {
      alert("Please enter course name");
      return false;
    }
    if (psub == "" || psub == null) {
      alert("Please enter Parent Subject");
      return false;
    }
    if (csub == "" || csub == null) {
      alert("Please enter Child Subject");
      return false;
    }
    if (Prov == "" || Prov == null) {
      alert("Please enter Provider");
      return false;
    }
    if (coll == "" || coll == null) {
      alert("Please enter Universities/Institutions");
      return false;
    }
    return true;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const status = formHandler(e);
    if (status) {
      fetch("https://auth-course-finder1.onrender.com/admin/addcourse", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
          admin: AdminId,
          coursename: cname,
          parentsub: psub,
          childsub: csub,
          provider: Prov,
          college: coll
        }),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          toast.success(resp.message);
          navigate("/admin");
        })
        .catch((error) => {
          toast("Error While Course-upload");
          console.log(error);
        });
    }
  };

  return (
    <form onSubmit={onSubmitHandler} method="post">
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="9" className="my-5">
            <h1 class="text-white mb-4">Apply for a job</h1>

            <MDBCard>
              <MDBCardBody className="px-4">
                <MDBRow className="align-items-center pt-2 pb-1">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">courseName</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      size="lg"
                      id="form1"
                      type="text"
                      onChange={onCnameChangeHandler}
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-2 pb-1">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">pSubject</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      size="lg"
                      id="form1"
                      type="text"
                      onChange={onPsubnameChangeHandler}
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-2 pb-1">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">cSubject</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      size="lg"
                      id="form1"
                      type="text"
                      onChange={onCsubnameChangeHandler}
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-2 pb-1">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Provider</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      size="lg"
                      id="form2"
                      type="text"
                      onChange={onProvChangeHandler}
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-2 pb-1">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">College</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      size="lg"
                      id="form2"
                      type="text"
                      onChange={onCollChangeHandler}
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBBtn className="my-4" size="lg" type="submit">
                  send application
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
  // return (
  //   <div className="cardHolder">
  //     <div className="signup-form" style={{ backgroundColor: "#19aa8d" }}>
  //       DashBoard page......
  //     </div>
  //   </div>
  // );
};

export default AdminDashBoard;
