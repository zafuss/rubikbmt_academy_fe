import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService.js";

class StudentManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getStudents()
      .then((data) => {
        this.setState({ students: data });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleAdd = (values) => {
    return addStudent(values).then((newStudent) => {
      this.setState((prevState) => ({
        students: [...prevState.students, newStudent],
      }));
    });
  };

  handleUpdate = (key, values) => {
    return updateStudent(key, values).then((updatedStudent) => {
      this.setState((prevState) => ({
        students: prevState.students.map((student) =>
          student.key === key ? updatedStudent : student
        ),
      }));
    });
  };

  handleDelete = (key) => {
    return deleteStudent(key).then(() => {
      this.setState((prevState) => ({
        students: prevState.students.filter((student) => student.key !== key),
      }));
    });
  };

  render() {
    const { students } = this.state;

    const columns = [
      { title: "Tên", dataIndex: "name", key: "name" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Lớp", dataIndex: "class", key: "class" },
      { title: "Ngày tham gia", dataIndex: "joinDate", key: "joinDate" },
    ];

    const formFields = [
      {
        name: "name",
        label: "Tên",
        placeholder: "Nhập tên",
        rules: [{ required: true, message: "Vui lòng nhập tên!" }],
      },
      {
        name: "email",
        label: "Email",
        placeholder: "Nhập email",
        rules: [
          { required: true, message: "Vui lòng nhập email!" },
          { type: "email", message: "Email không hợp lệ!" },
        ],
      },
      {
        name: "class",
        label: "Lớp",
        placeholder: "Nhập lớp",
        rules: [{ required: true, message: "Vui lòng nhập lớp!" }],
      },
    ];

    return (
      <DataManagementPage
        title="Quản lý học viên"
        subtitle="Xem và quản lý danh sách học viên trong hệ thống."
        columns={columns}
        data={students}
        onAdd={this.handleAdd}
        onUpdate={this.handleUpdate}
        onDelete={this.handleDelete}
        formFields={formFields}
      />
    );
  }
}

export default StudentManagement;