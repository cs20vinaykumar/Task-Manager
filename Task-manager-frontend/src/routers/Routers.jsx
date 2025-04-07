import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/common/login/Login";
import Register from "../pages/common/register/Register";
import Layout from "../layout/Layout";
import LandingPage from "../pages/common/landingPage/landingPage";

import Home from "../pages/user/home/Home";
import AddTask from "../pages/user/addTask/AddTask";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-task" element={<AddTask />} />
        </Route>
      </Routes>
    </>
  );
};

export default Routers;
