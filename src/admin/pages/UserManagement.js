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
      const usersData = this.props.users.data.map((user, index) => ({
        ...user,
        key: user._id || user.email || `user-${index}`,
      }));
      console.log("Users data:", usersData);

      const dynamicColumns = this.generateColumns(usersData);

      this.setState({
        users: usersData,
        columns: dynamicColumns,
      });
    }
  }

  generateColumns(users) {
    if (!users || users.length === 0) return [];

    const sttColumn = {
      title: "STT",
      key: "stt",
      width: 60,
      fixed: "left",
      render: (text, record, index) => index + 1,
    };

    const columns = [
      {
        title: "Họ và tên",
        key: "fullName",
        width: 200,
        render: (text, record) => {
          const firstName = record.firstName || "";
          const lastName = record.lastName || "";
          return `${firstName} ${lastName}`.trim() || "Chưa cập nhật";
        },
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 200,
      },
      {
        title: "Số điện thoại",
        dataIndex: "phone",
        key: "phone",
        width: 150,
        render: (text) => text || "Chưa cập nhật",
      },
      {
        title: "Ngày sinh",
        dataIndex: "dateOfBirth",
        key: "dateOfBirth",
        width: 150,
        render: (text) => text || "Chưa cập nhật",
      },
      {
        title: "Tên phụ huynh",
        dataIndex: "parentName",
        key: "parentName",
        width: 200,
        render: (text) => text || "Chưa cập nhật",
      },
      {
        title: "Số khoá đã học",
        dataIndex: "studiedCourse",
        key: "studiedCourse",
        width: 150,
        render: (text) => text || "Chưa cập nhật",
      },
      {
        title: "Avatar",
        key: "avatar",
        width: 100,
        render: (text, record) => {
          if (record.avatar) {
            return (
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}auth/get-image/${record.avatar}`}
                alt="Avatar"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            );
          }
          return "Chưa có ảnh";
        },
      },
      {
        title: "Ngày tham gia",
        key: "createDate",
        width: 150,
        render: (text, record) => {
          if (record.createDate) {
            const date = new Date(record.createDate);
            return date.toLocaleString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
          }
          return "Chưa cập nhật";
        },
      },
    ];

    return [sttColumn, ...columns];
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
      const userWithKey = {
        ...newUser,
        key: newUser.id || newUser.email || Date.now(),
      };
      this.setState((prevState) => ({
        users: [...prevState.users, userWithKey],
        columns: this.generateColumns([...prevState.users, userWithKey]),
      }));
    });
  };

  handleUpdate = (key, values) => {
    return updateUser(key, values).then((updatedUser) => {
      const userWithKey = {
        ...updatedUser,
        key: updatedUser.id || updatedUser.email || key,
      };
      this.setState((prevState) => ({
        users: prevState.users.map((user) =>
          user.key === key ? userWithKey : user
        ),
        columns: this.generateColumns(
          prevState.users.map((user) => (user.key === key ? userWithKey : user))
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
        rowKey="key" // Chỉ định trường key
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
