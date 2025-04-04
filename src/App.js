import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import Login from "./admin/pages/Login";
import Register from "./admin/pages/Register";
import Layout from "./admin/components/Layout";
import Dashboard from "./admin/pages/Dashboard";
import UserManagement from "./admin/pages/UserManagement";
import MentorManagement from "./admin/pages/MentorManagement";
import StudentManagement from "./admin/pages/StudentManagement";
import Profile from "./admin/pages/Profile";
import ClassList from "./admin/pages/ClassList";
import AddMassClass from "./admin/pages/AddMassClass";
import AddOneOnOneClass from "./admin/pages/AddOneOnOneClass";
import colors from "./admin/constants/colors.js";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CuberForm from "./admin/pages/CuberForm";
import store from "./store/config/store";
import { Provider } from "react-redux";
import CubeSubjectManagement from "./admin/pages/CubeSubjectManagement";
import CourseManagement from "./admin/pages/CourseManagement";
import DifficultyManagement from "./admin/pages/DifficultyManagement";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import LevelManagement from "./admin/pages/LevelManagement";
import CubeSkillManagement from "./admin/pages/CubeSkillManagement";
const root = document.documentElement;

Object.keys(colors).forEach((key) => {
  root.style.setProperty(`--${key}`, colors[key]);
});

function ScrollToHashElement() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Provider store={store}>
          <ScrollToHashElement />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/cuber-form" element={<CuberForm />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="mentors" element={<MentorManagement />} />
              <Route path="students" element={<StudentManagement />} />
              <Route path="cubeSubjects" element={<CubeSubjectManagement />} />
              <Route path="courses" element={<CourseManagement />} />
              <Route path="difficulties" element={<DifficultyManagement />} />
              <Route path="levels" element={<LevelManagement />} />
              <Route path="cubeSkills" element={<CubeSkillManagement />} />
              <Route path="profile" element={<Profile />} />
              <Route path="classes/list" element={<ClassList />} />
              <Route path="classes/add/mass" element={<AddMassClass />} />
              <Route
                path="classes/add/one-on-one"
                element={<AddOneOnOneClass />}
              />
            </Route>
          </Routes>
        </Provider>
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default App;
