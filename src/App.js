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
import SubjectManagement from "./admin/pages/SubjectManagement";
import CourseManagement from "./admin/pages/CourseManagement";
import DifficultyManagement from "./admin/pages/DifficultyManagement";
const root = document.documentElement;

Object.keys(colors).forEach((key) => {
  root.style.setProperty(`--${key}`, colors[key]);
});

const mockData = {
  parent: { name: "Nguyễn Văn A", phone: "0901234567", address: "Hà Nội" },
  student: { name: "Nguyễn Văn B", birthYear: "2010", course: "Cơ bản" },
  skills: {
    focus: 80,
    memory: 70,
    perseverance: 90,
    reflexes: 85,
    dexterity: 75,
    creativity: 60,
  },
  cubeSkills: { cross: 80, f2l: 70, oll: 85, pll: 90, fingerTrick: 75 },
};

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
            <Route path="/admin" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="mentors" element={<MentorManagement />} />
              <Route path="students" element={<StudentManagement />} />
              <Route path="subjects" element={<SubjectManagement />} />
              <Route path="courses" element={<CourseManagement />} />
              <Route path="difficulties" element={<DifficultyManagement />} />
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
