import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../services/userService.js";
import { connect } from "react-redux";
import { fetchUserList } from "src/store/actions/user/userActions.js";

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      columns: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserList();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.getUserListSuccess &&
      prevProps.users !== this.props.users &&
      Array.isArray(this.props.users.data) &&
      this.props.users.data.length > 0
    ) {
      const usersData = this.props.users.data;
      console.log("Users data:", usersData);

      // Tạo columns động từ dữ liệu users
      const dynamicColumns = this.generateColumns(usersData);

      this.setState({
        users: usersData,
        columns: dynamicColumns,
      });
    }
  }

  // Hàm tạo columns động từ dữ liệu users, thêm cột STT
  generateColumns(users) {
    if (!users || users.length === 0) return [];

    // Cột STT
    const sttColumn = {
      title: "STT",
      key: "stt",
      width: 60, // Chiều rộng cố định cho cột STT
      fixed: "left", // Cố định cột STT bên trái
      render: (text, record, index) => index + 1, // Hiển thị số thứ tự (bắt đầu từ 1)
    };

    // Lấy đối tượng đầu tiên để xác định các trường
    const firstUser = users[0];
    const dynamicColumns = Object.keys(firstUser)
      .filter((key) => key.toLowerCase() !== "_id") // Loại trừ cột _id
      .map((key) => ({
        title: this.formatColumnTitle(key),
        dataIndex: key,
        key: key,
        width: 150, // Chiều rộng mặc định cho các cột động
      }));

    // Thêm cột STT vào đầu danh sách columns
    return [sttColumn, ...dynamicColumns];
  }

  // Hàm định dạng tiêu đề cột
  formatColumnTitle(key) {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  formFields = [
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
      name: "role",
      label: "Vai trò",
      placeholder: "Chọn vai trò",
      type: "select",
      options: [
        { value: "Admin", label: "Admin" },
        { value: "Giáo viên", label: "Giáo viên" },
      ],
      rules: [{ required: true, message: "Vui lòng chọn vai trò!" }],
    },
  ];

  handleAdd = (values) => {
    return addUser(values).then((newUser) => {
      this.setState((prevState) => ({
        users: [...prevState.users, newUser],
        columns: this.generateColumns([...prevState.users, newUser]),
      }));
    });
  };

  handleUpdate = (key, values) => {
    return updateUser(key, values).then((updatedUser) => {
      this.setState((prevState) => ({
        users: prevState.users.map((user) =>
          user.key === key ? updatedUser : user
        ),
        columns: this.generateColumns(
          prevState.users.map((user) => (user.key === key ? updatedUser : user))
        ),
      }));
    });
  };

  handleDelete = (key) => {
    return deleteUser(key).then(() => {
      this.setState((prevState) => {
        const updatedUsers = prevState.users.filter((user) => user.key !== key);
        return {
          users: updatedUsers,
          columns: this.generateColumns(updatedUsers),
        };
      });
    });
  };

  render() {
    const { users, columns } = this.state;

    return (
      <DataManagementPage
        title="Quản lý người dùng"
        subtitle="Xem và quản lý danh sách người dùng trong hệ thống."
        columns={columns}
        data={users}
        onAdd={this.handleAdd}
        onUpdate={this.handleUpdate}
        onDelete={this.handleDelete}
        formFields={this.formFields}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.userReducer.gettingUserList,
    getUserListSuccess: state.userReducer.getUserListSuccess,
    getUserListFailure: state.userReducer.getUserListFailureMsg,
    users: state.userReducer.userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserList: () => dispatch(fetchUserList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
