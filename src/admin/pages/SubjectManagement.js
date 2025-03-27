import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import {
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../services/subjectService.js";

class SubjectManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getSubjects()
      .then((data) => {
        this.setState({ subjects: data });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleAdd = (values) => {
    return addSubject(values).then((newSubject) => {
      this.setState((prevState) => ({
        subjects: [...prevState.subjects, newSubject],
      }));
    });
  };

  handleUpdate = (key, values) => {
    return updateSubject(key, values).then((updatedSubject) => {
      this.setState((prevState) => ({
        subjects: prevState.subjects.map((subject) =>
          subject.key === key ? updatedSubject : subject
        ),
      }));
    });
  };

  handleDelete = (key) => {
    return deleteSubject(key).then(() => {
      this.setState((prevState) => ({
        subjects: prevState.subjects.filter((subject) => subject.key !== key),
      }));
    });
  };

  render() {
    const { subjects } = this.state;

    const columns = [
      { title: "Tên bộ môn", dataIndex: "name", key: "name" },
      { title: "Mô tả", dataIndex: "description", key: "description" },
    ];

    const formFields = [
      {
        name: "name",
        label: "Tên bộ môn",
        placeholder: "Nhập tên bộ môn",
        rules: [{ required: true, message: "Vui lòng nhập tên bộ môn!" }],
      },
      {
        name: "description",
        label: "Mô tả",
        placeholder: "Nhập mô tả bộ môn",
        rules: [{ required: true, message: "Vui lòng nhập mô tả!" }],
      },
    ];

    return (
      <DataManagementPage
        title="Quản lý bộ môn"
        subtitle="Xem và quản lý danh sách bộ môn trong hệ thống."
        columns={columns}
        data={subjects}
        onAdd={this.handleAdd}
        onUpdate={this.handleUpdate}
        onDelete={this.handleDelete}
        formFields={formFields}
      />
    );
  }
}

export default SubjectManagement;