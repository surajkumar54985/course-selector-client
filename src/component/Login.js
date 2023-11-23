import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";
// import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./loader";

const Login = ({ setIsloggedin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [LoggingIn, setIsLoggingIn] = useState(false);

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
    setIsLoggingIn(true);
    const status = formHandler(e);
    if (status) {
      fetch("https://auth-course-finder1.onrender.com/user/login", {
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
          const Token = localStorage.getItem("Token");
          if (resp.message === "Incorrect Username") {
            setIsLoggingIn(false);
          }
          if (resp.message === "Invalid Password") {
            setIsLoggingIn(false);
          }

          toast.success(resp.message);

          fetch("https://auth-course-finder1.onrender.com/user/dashboard", {
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
              // console.log(resp);
              if (resp.ok) {
                localStorage.setItem("loggedin", true);
                const loggedin = localStorage.getItem("loggedin");
                setIsloggedin(loggedin);
                setIsLoggingIn(false);
                toast.success(resp.message);
                navigate("/");
              }
              if (resp.status == 401) {
                setIsLoggingIn(false);
                toast.success(resp.message);
                fetch("https://auth-course-finder1.onrender.com/user/resend", {
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
                navigate("/login");
              }
            })
            .catch((error) => {
              setIsLoggingIn(false);
              console.log(error);
            });
        })
        .catch((error) => {
          setIsLoggingIn(false);
          console.log(error);
        });
    }
  };

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div className="cardHolder">
        {LoggingIn ? (
          <Loader />
        ) : (
          <div className="signup-form" style={{ backgroundColor: "#19aa8d" }}>
            <form
              onSubmit={onSubmitHandler}
              method="post"
              style={{ marginTop: "140px" }}
            >
              <h2>Login</h2>

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
      </div>
    </div>
  );
};

export default Login;
