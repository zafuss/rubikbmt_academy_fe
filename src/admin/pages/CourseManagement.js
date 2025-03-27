import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../services/courseService.js";

class CourseManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getCourses()
      .then((data) => {
        this.setState({ courses: data });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleAdd = (values) => {
    return addCourse(values).then((newCourse) => {
      this.setState((prevState) => ({
        courses: [...prevState.courses, newCourse],
      }));
    });
  };

  handleUpdate = (key, values) => {
    return updateCourse(key, values).then((updatedCourse) => {
      this.setState((prevState) => ({
        courses: prevState.courses.map((course) =>
          course.key === key ? updatedCourse : course
        ),
      }));
    });
  };

  handleDelete = (key) => {
    return deleteCourse(key).then(() => {
      this.setState((prevState) => ({
        courses: prevState.courses.filter((course) => course.key !== key),
      }));
    });
  };

  render() {
    const { courses } = this.state;

    const columns = [
      { title: "Tên khóa học", dataIndex: "name", key: "name" },
      { title: "Mô tả", dataIndex: "description", key: "description" },
      { title: "Ngày bắt đầu", dataIndex: "startDate", key: "startDate" },
      { title: "Ngày kết thúc", dataIndex: "endDate", key: "endDate" },
    ];

    const formFields = [
      {
        name: "name",
        label: "Tên khóa học",
        placeholder: "Nhập tên khóa học",
        rules: [{ required: true, message: "Vui lòng nhập tên khóa học!" }],
      },
      {
        name: "description",
        label: "Mô tả",
        placeholder: "Nhập mô tả khóa học",
        rules: [{ required: true, message: "Vui lòng nhập mô tả!" }],
      },
      {
        name: "startDate",
        label: "Ngày bắt đầu",
        placeholder: "Chọn ngày bắt đầu",
        type: "date",
        rules: [{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }],
      },
      {
        name: "endDate",
        label: "Ngày kết thúc",
        placeholder: "Chọn ngày kết thúc",
        type: "date",
        rules: [{ required: true, message: "Vui lòng chọn ngày kết thúc!" }],
      },
    ];

    return (
      <DataManagementPage
        title="Quản lý khóa học"
        subtitle="Xem và quản lý danh sách khóa học trong hệ thống."
        columns={columns}
        data={courses}
        onAdd={this.handleAdd}
        onUpdate={this.handleUpdate}
        onDelete={this.handleDelete}
        formFields={formFields}
      />
    );
  }
}

export default CourseManagement;