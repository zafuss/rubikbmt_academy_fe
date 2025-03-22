import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import Login from "./admin/pages/Login";
import Register from "./admin/pages/Register";
import Layout from "./admin/components/Layout";
import Dashboard from "./admin/pages/Dashboard";
import UserManagement from "./admin/pages/UserManagement";
import Profile from "./admin/pages/Profile";
import ClassList from "./admin/pages/ClassList";
import AddMassClass from "./admin/pages/AddMassClass";
import AddOneOnOneClass from "./admin/pages/AddOneOnOneClass";
import colors from "./admin/constants/colors.js";
const root = document.documentElement;

Object.keys(colors).forEach((key) => {
  root.style.setProperty(`--${key}`, colors[key]);
});

function App() {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="profile" element={<Profile />} />
            <Route path="classes/list" element={<ClassList />} />
            <Route path="classes/add/mass" element={<AddMassClass />} />
            <Route
              path="classes/add/one-on-one"
              element={<AddOneOnOneClass />}
            />
          </Route>
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default App;
