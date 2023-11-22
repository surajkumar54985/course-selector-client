import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import FormPage from "./component/Form";
import AdminFormPage from "./component/AdminForm";
import Login from "./component/Login";
import AdminLogin from "./component/AdminLogin";
import AdminDashboard from "./component/AdminDashboard/AdminDashboard";
import Dashboard from "./component/Dashboard/Dashboard";
import DashBord from "./component/Dashboard/DashBord";
import Header from "./component/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./component/loader";

function App() {
  const [loggedin, setIsloggedin] = useState(false);
  const [adminloggedin, setIsadminloggedin] = useState(false);

  // const loggedin = localStorage.getItem("loggedin");
  const token = localStorage.getItem("Token");
  // console.log(loggedin);
  // console.log(token);

  const logoutHandler = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("AdminId");
    localStorage.removeItem("loggedin");
    localStorage.removeItem("adminloggedin");
    const loggedin = localStorage.getItem("loggedin");
    const adminloggedin = localStorage.getItem("adminloggedin");
    setIsloggedin(loggedin);
    setIsadminloggedin(adminloggedin);
    console.log(loggedin);
    console.log(adminloggedin);
    console.log(token);
    toast.success('LoggedOut Successfully');
  };

  useEffect(() => {
    const loggedin = localStorage.getItem("loggedin");
    setIsloggedin(loggedin);
    const adminloggedin = localStorage.getItem("adminloggedin");
    setIsadminloggedin(adminloggedin);
  }, []);



  return (
    <Router>
      <Header adminloggedin={adminloggedin} loggedin={loggedin} token={token} logoutHandler={logoutHandler} />
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
          path="/admin"
          element={adminloggedin ? <AdminDashboard /> : <AdminLogin setIsadminloggedin={setIsadminloggedin} />}
        />
        <Route
          exact
          path="/login"
          element={<Login setIsloggedin={setIsloggedin} />}
        />
        <Route
          exact
          path="/adminsignup"
          element={<AdminFormPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
