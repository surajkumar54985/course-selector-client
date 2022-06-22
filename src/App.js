import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import FormPage from "./component/Form";
import Login from "./component/Login";
import DashBord from "./component/Dashboard/DashBord";
import Header from "./component/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./component/loader";

function App() {
  const [loggedin, setIsloggedin] = useState(false);

  // const loggedin = localStorage.getItem("loggedin");
  const token = localStorage.getItem("Token");
  // console.log(loggedin);
  // console.log(token);

  const logoutHandler = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("loggedin");
    const loggedin = localStorage.getItem("loggedin");
    setIsloggedin(loggedin);
    // console.log(loggedin);
    // console.log(token);
    toast.success('LoggedOut Successfully');
  };

  useEffect(() => {
    const loggedin = localStorage.getItem("loggedin");
    setIsloggedin(loggedin);
  }, []);



  return (
    <Router>
      <Header loggedin={loggedin} token={token} logoutHandler={logoutHandler} />
      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <Routes>
        <Route
          exact
          path="/"
          element={loggedin ? <DashBord /> : <FormPage />}
        />
        <Route
          exact
          path="/login"
          element={<Login setIsloggedin={setIsloggedin} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
