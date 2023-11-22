import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
// import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./loader";

const AdminLogin = ({ setIsadminloggedin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [adminLoggingIn, setIsadminLoggingIn] = useState(false);

  const navigate = useNavigate();

  const EmailChangeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value.toLowerCase());
  };
  const passChangeHandler = (e) => {
    e.preventDefault();
    setPass(e.target.value);
  };
  const formHandler = (e) => {
    e.preventDefault();

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert("You have entered an invalid email address!");
      return false;
    }
    if (pass.length < 7) {
      alert("Password must have more than 7 characters");
      return false;
    }
    return true;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsadminLoggingIn(true);
    const status = formHandler(e);
    if (status) {
      fetch("http://localhost:8000/admin/login", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
          email: email,
          password: pass,
        }),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          localStorage.setItem("Token", resp.token);
          localStorage.setItem("AdminId", resp.AdminToken);
          const Token = localStorage.getItem("Token");
          console.log(`Token - `+Token);
          console.log(localStorage);
          if (resp.message === "Incorrect Username") {
            setIsadminLoggingIn(false);
          }
          if (resp.message === "Invalid Password") {
            setIsadminLoggingIn(false);
          }

          toast.success(resp.message);

          fetch("http://localhost:8000/admin/dashboard", {
            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
              Token: Token,
            }),

            // Adding headers to the request
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((resp) => {
              console.log(resp);
              if (resp.ok) {
                localStorage.setItem("adminloggedin", true);
                const adminloggedin = localStorage.getItem("adminloggedin");
                setIsadminloggedin(adminloggedin);
                setIsadminLoggingIn(false);
                toast.success(resp.message);
                navigate("/admin");
              }
              if (resp.status == 401) {
                setIsadminLoggingIn(false);
                toast.success(resp.message);
                fetch("http://localhost:8000/admin/resend", {
                  // Adding method type
                  method: "POST",

                  // Adding body or contents to send
                  body: JSON.stringify({
                    email: email,
                  }),

                  // Adding headers to the request
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                  },
                })
                  .then((data) => console.log(data))
                  .catch((err) => console.log(err));
                navigate("/admin");
              }
            })
            .catch((error) => {
                setIsadminLoggingIn(false);
              console.log(error);
            });
        })
        .catch((error) => {
            setIsadminLoggingIn(false);
          console.log(error);
        });
    }
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div className="cardHolder">
        {adminLoggingIn ? (
          <Loader />
        ) : (
          <div className="signup-form" style={{ backgroundColor: "#19aa8d" }}>
            <form
              onSubmit={onSubmitHandler}
              method="post"
              style={{ marginTop: "140px" }}
            >
              <h2>Admin Login</h2>

              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-paper-plane"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={EmailChangeHandler}
                    placeholder="Email Address"
                    required="required"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="password"
                    onChange={passChangeHandler}
                    placeholder="Password"
                    required="required"
                  />
                </div>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-lg">
                  Log In
                </button>
              </div>
            </form>
            </div>
        )}
        <div className="text-center">Create an admin account. <a href="http://localhost:3000/adminsignup">Admin Signup</a></div>
        
      </div>
    </div>
  );
};

export default AdminLogin;
