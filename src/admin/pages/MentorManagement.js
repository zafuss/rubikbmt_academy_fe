import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import {
  getMentors,
  addMentor,
  updateMentor,
  deleteMentor,
} from "../services/mentorService.js";

class MentorManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mentors: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getMentors()
      .then((data) => {
        this.setState({ mentors: data });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleAdd = (values) => {
    return addMentor(values).then((newMentor) => {
      this.setState((prevState) => ({
        mentors: [...prevState.mentors, newMentor],
      }));
    });
  };

  handleUpdate = (key, values) => {
    return updateMentor(key, values).then((updatedMentor) => {
      this.setState((prevState) => ({
        mentors: prevState.mentors.map((mentor) =>
          mentor.key === key ? updatedMentor : mentor
        ),
      }));
    });
  };

  handleDelete = (key) => {
    return deleteMentor(key).then(() => {
      this.setState((prevState) => ({
        mentors: prevState.mentors.filter((mentor) => mentor.key !== key),
      }));
    });
  };

  render() {
    const { mentors } = this.state;

    const columns = [
      { title: "Tên", dataIndex: "name", key: "name" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Chuyên môn", dataIndex: "expertise", key: "expertise" },
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
        name: "expertise",
        label: "Chuyên môn",
        placeholder: "Nhập chuyên môn",
        rules: [{ required: true, message: "Vui lòng nhập chuyên môn!" }],
      },
    ];

    return (
      <DataManagementPage
        title="Quản lý giáo viên"
        subtitle="Xem và quản lý danh sách giáo viên trong hệ thống."
        columns={columns}
        data={mentors}
        onAdd={this.handleAdd}
        onUpdate={this.handleUpdate}
        onDelete={this.handleDelete}
        formFields={formFields}
      />
    );
  }
}

export default MentorManagement;