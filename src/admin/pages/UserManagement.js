import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import { deleteUser } from "../services/userService.js";
import { connect } from "react-redux";
import {
  addUser,
  fetchUserList,
  updateUser,
  updateUserStatus,
} from "src/store/actions/user/userActions.js";
import { Space, Button, message, Spin } from "antd";

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      columns: [],
      updatingEmail: null,
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

    if (
      !prevProps.updateUserStatusSuccess &&
      this.props.updateUserStatusSuccess
    ) {
      message.success("Cập nhật trạng thái thành công!");
      this.props.fetchUserList();
    }

    if (
      !prevProps.updateUserStatusFailure &&
      this.props.updateUserStatusFailure
    ) {
      message.error(
        this.props.updateUserStatusFailure || "Cập nhật trạng thái thất bại!"
      );
    }

    if (
      this.props.updatingUserStatus !== prevProps.updatingUserStatus &&
      !this.props.updatingUserStatus
    ) {
      this.setState({ updatingEmail: null });
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
      {
        title: "Vai trò",
        key: "roles",
        width: 200,
        render: (text, record) => {
          console.log(record);
          return record.roles ? record.roles.join(", ") : "Chưa cập nhật";
        },
      },
      {
        title: "Trạng thái",
        key: "status",
        width: 150,
        render: (text, record) => {
          const getStatusInfo = (status) => {
            switch (status) {
              case 1:
                return {
                  text: "Đang hoạt động",
                  color: "#52c41a",
                  buttonText: "Vô hiệu hóa",
                };
              case 0:
                return {
                  text: "Chưa xác nhận",
                  color: "#faad14",
                  buttonText: "Xác nhận",
                };
              case -1:
                return {
                  text: "Đã vô hiệu hóa",
                  color: "#ff4d4f",
                  buttonText: "Kích hoạt",
                };
              default:
                return {
                  text: "Chưa xác định",
                  color: "#999999",
                  buttonText: "Xác nhận",
                };
            }
          };

          const statusInfo = getStatusInfo(record.status);

          return (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <span
                style={{
                  color: statusInfo.color,
                  fontWeight: 500,
                }}
              >
                {statusInfo.text}
              </span>
              <Button
                type="primary"
                danger={record.status === 1}
                size="small"
                loading={this.state.updatingEmail === record.email}
                onClick={() =>
                  this.handleUpdateStatus(record.email, record.status)
                }
              >
                {statusInfo.buttonText}
              </Button>
            </div>
          );
        },
      },
    ];

    return [sttColumn, ...columns];
  }

  formFields = [
    {
      name: "firstName",
      label: "Họ",
      placeholder: "Nhập họ",
      rules: [{ required: true, message: "Vui lòng nhập họ!" }],
    },
    {
      name: "lastName",
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
      name: "phone",
      label: "Số điện thoại",
      placeholder: "Nhập số điện thoại",
      rules: [
        { required: true, message: "Vui lòng nhập số điện thoại!" },
        { type: "text", message: "Số điện thoại không hợp lệ!" },
      ],
    },
    {
      name: "parentName",
      label: "Tên phụ huynh",
      placeholder: "Nhập tên phụ huynh",
      rules: [{ type: "text", message: "Tên phụ huynh không hợp lệ!" }],
    },
    {
      name: "roles",
      label: "Vai trò",
      type: "checkbox-group",
      options: [
        { value: "admin", label: "Admin" },
        { value: "teacher", label: "Giáo viên" },
        { value: "student", label: "Học sinh" },
        { value: "parent", label: "Phụ huynh" },
      ],
      rules: [
        { required: true, message: "Vui lòng chọn ít nhất một vai trò!" },
      ],
    },
  ];

  handleAdd = (values) => {
    this.props.addUser(values);
  };

  handleUpdate = (values) => {
    this.props.updateUser(values);
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

  handleUpdateStatus = (email, currentStatus) => {
    const newStatus = currentStatus === 1 ? -1 : 1;
    this.setState({ updatingEmail: email });
    this.props.updateUserStatus(email, newStatus);
  };

  render() {
    const { users, columns } = this.state;

    return (
      <DataManagementPage
        title="Quản lý người dùng"
        subtitle="Xem và quản lý danh sách người dùng trong hệ thống."
        columns={columns}
        data={users}
        rowKey="key"
        onAdd={this.handleAdd}
        onUpdate={this.handleUpdate}
        onDelete={this.handleDelete}
        formFields={this.formFields}
        loading={this.props.gettingUserList}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.userReducer.gettingUserList,
    gettingUserList: state.userReducer.gettingUserList,
    getUserListSuccess: state.userReducer.getUserListSuccess,
    getUserListFailure: state.userReducer.getUserListFailureMsg,
    users: state.userReducer.userList,
    updateUserStatusSuccess: state.userReducer.updateUserStatusSuccess,
    updateUserStatusFailure: state.userReducer.updateUserStatusFailureMsg,
    updatingUserStatus: state.userReducer.updatingUserStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserList: () => dispatch(fetchUserList()),
    updateUserStatus: (email, status) =>
      dispatch(updateUserStatus(email, status)),
    addUser: (values) => dispatch(addUser(values)),
    updateUser: (values) => dispatch(updateUser(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
