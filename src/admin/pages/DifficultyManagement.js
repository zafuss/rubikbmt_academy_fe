import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import {
  getDifficulties,
  addDifficulty,
  updateDifficulty,
  deleteDifficulty,
} from "../services/difficultyService.js";

class DifficultyManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulties: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getDifficulties()
      .then((data) => {
        this.setState({ difficulties: data });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleAdd = (values) => {
    return addDifficulty(values).then((newDifficulty) => {
      this.setState((prevState) => ({
        difficulties: [...prevState.difficulties, newDifficulty],
      }));
    });
  };

  handleUpdate = (key, values) => {
    return updateDifficulty(key, values).then((updatedDifficulty) => {
      this.setState((prevState) => ({
        difficulties: prevState.difficulties.map((difficulty) =>
          difficulty.key === key ? updatedDifficulty : difficulty
        ),
      }));
    });
  };

  handleDelete = (key) => {
    return deleteDifficulty(key).then(() => {
      this.setState((prevState) => ({
        difficulties: prevState.difficulties.filter(
          (difficulty) => difficulty.key !== key
        ),
      }));
    });
  };

  render() {
    const { difficulties } = this.state;

    const columns = [
      { title: "Tên độ khó", dataIndex: "name", key: "name" },
      { title: "Mô tả", dataIndex: "description", key: "description" },
    ];

    const formFields = [
      {
        name: "name",
        label: "Tên độ khó",
        placeholder: "Nhập tên độ khó",
        rules: [{ required: true, message: "Vui lòng nhập tên độ khó!" }],
      },
      {
        name: "description",
        label: "Mô tả",
        placeholder: "Nhập mô tả độ khó",
        rules: [{ required: true, message: "Vui lòng nhập mô tả!" }],
      },
    ];

    return (
      <DataManagementPage
        title="Quản lý độ khó"
        subtitle="Xem và quản lý danh sách độ khó trong hệ thống."
        columns={columns}
        data={difficulties}
        onAdd={this.handleAdd}
        onUpdate={this.handleUpdate}
        onDelete={this.handleDelete}
        formFields={formFields}
      />
    );
  }
}

export default DifficultyManagement;