import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import { connect } from "react-redux";
import {
  addSession,
  fetchSessionList,
  updateSession,
  updateSessionStatus,
} from "src/store/actions/session/sessionActions.js";
import { Space, Button, message, Spin } from "antd";
import withNavigate from "src/store/HOC/withNavigate.js";
import { withRouter } from "src/store/HOC/withRouter.js";
import { compose } from "redux";

class SessionManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      columns: [],
      updatingEmail: null,
    };
  }

  componentDidMount() {
    const id = this.props.params.id;
    console.log("Component mounted with ID:", id);
    this.props.fetchSessionList(id);
  }

  componentDidUpdate(prevProps) {
    console.log("Component updated:", this.props.sessions);
    if (prevProps.sessions !== this.props.sessions) {
      const sessionsData = this.props.sessions.map((session, index) => ({
        ...session,
        key: session._id || session.email || `session-${index}`,
      }));
      console.log("Sessions data:", sessionsData);

      const dynamicColumns = this.generateColumns(sessionsData);

      this.setState({
        sessions: sessionsData,
        columns: dynamicColumns,
      });
    }

    if (
      !prevProps.updateSessionStatusSuccess &&
      this.props.updateSessionStatusSuccess
    ) {
      message.success("Cập nhật trạng thái thành công!");
      this.props.fetchSessionList();
    }

    if (
      !prevProps.updateSessionStatusFailure &&
      this.props.updateSessionStatusFailure
    ) {
      message.error(
        this.props.updateSessionStatusFailure || "Cập nhật trạng thái thất bại!"
      );
    }

    if (
      this.props.updatingSessionStatus !== prevProps.updatingSessionStatus &&
      !this.props.updatingSessionStatus
    ) {
      this.setState({ updatingEmail: null });
    }
  }

  generateColumns(sessions) {
    if (!sessions || sessions.length === 0) return [];

    const sttColumn = {
      title: "STT",
      key: "stt",
      width: 60,
      fixed: "left",
      render: (text, record, index) => index + 1,
    };

    const columns = [
      {
        title: "Thời gian bắt đầu",
        dataIndex: "startTime",
        key: "startTime",
        width: 200,
        render: (text) =>
          text
            ? new Date(text).toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "Chưa cập nhật",
      },
      {
        title: "Thời gian kết thúc",
        dataIndex: "endTime",
        key: "endTime",
        width: 200,
        render: (text) =>
          text
            ? new Date(text).toLocaleString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "Chưa cập nhật",
      },
      {
        title: "Nội dung buổi học",
        dataIndex: "content",
        key: "content",
        width: 200,
        render: (text) => (text ? text : "Chưa cập nhật"),
      },
      {
        title: "Kết quả ao5",
        dataIndex: "ao5",
        key: "ao5",
        width: 200,
        render: (text) => (text ? `${text}` : "Chưa cập nhật"),
      },
      {
        title: "Chỉnh sửa chi tiết",
        key: "edit",
        width: 150,
        render: (text, record) => (
          <Button type="primary" onClick={() => this.handleEdit(record)}>
            Chỉnh sửa
          </Button>
        ),
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
    this.props.addSession(values);
  };

  handleUpdate = (values) => {
    this.props.updateSession(values);
  };

  handleDelete = (key) => {};

  handleUpdateStatus = (email, currentStatus) => {
    const newStatus = currentStatus === 1 ? -1 : 1;
    this.setState({ updatingEmail: email });
    this.props.updateSessionStatus(email, newStatus);
  };

  handleEdit = (record) => {
    const { navigate } = this.props;
    // Điều hướng đến trang chỉnh sửa chi tiết, ví dụ: /sessions/edit/:id
    navigate(`/admin/session/edit/${record.key}`);
  };

  render() {
    const { sessions, columns } = this.state;
    const { navigate } = this.props; // Nhận navigate từ props
    return (
      <DataManagementPage
        title="Quản lý các buổi học"
        subtitle="Xem và quản lý danh sách các buổi học."
        columns={columns}
        data={sessions}
        rowKey="key"
        onAdd={this.handleAdd}
        onDelete={this.handleDelete}
        formFields={this.formFields}
        loading={this.props.gettingSessionList}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.sessionReducer.loading,
    gettingSessionList: state.sessionReducer.gettingSessionList,
    getSessionListSuccess: state.sessionReducer.getSessionListSuccess,
    getSessionListFailure: state.sessionReducer.error,
    sessions: state.sessionReducer.sessionList,
    updateSessionStatusSuccess: state.sessionReducer.updateSessionStatusSuccess,
    updateSessionStatusFailure:
      state.sessionReducer.updateSessionStatusFailureMsg,
    updatingSessionStatus: state.sessionReducer.updatingSessionStatus,
    currentCourseDetail: state.courseDetailReducer.currentCourseDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSessionList: (id) => dispatch(fetchSessionList(id)),
    updateSession: (session) => dispatch(updateSession(session)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(withNavigate(SessionManagement));
