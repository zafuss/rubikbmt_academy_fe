import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import { connect } from "react-redux";
import {
  fetchCourseList,
  addCourse,
  updateCourse,
  updateCourseStatus,
} from "src/store/actions/course/courseActions.js";
import { Space, Button, message, Spin } from "antd";

class CourseManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      columns: [],
      updatingCourseId: null,
    };
  }

  componentDidMount() {
    this.props.fetchCourseList();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.getCourseListSuccess &&
      prevProps.courses !== this.props.courses &&
      Array.isArray(this.props.courses) &&
      this.props.courses.length > 0
    ) {
      const coursesData = this.props.courses.map((course, index) => ({
        ...course,
        key: course._id || `course-${index}`,
      }));

      const dynamicColumns = this.generateColumns(coursesData);

      this.setState({
        courses: coursesData,
        columns: dynamicColumns,
      });
    }

    if (
      !prevProps.updateCourseStatusSuccess &&
      this.props.updateCourseStatusSuccess
    ) {
      message.success("Cập nhật trạng thái thành công!");
      this.props.fetchCourseList();
    }

    if (
      !prevProps.updateCourseStatusFailure &&
      this.props.updateCourseStatusFailure
    ) {
      message.error(
        this.props.updateCourseStatusFailure || "Cập nhật trạng thái thất bại!"
      );
    }

    if (
      this.props.updatingCourseStatus !== prevProps.updatingCourseStatus &&
      !this.props.updatingCourseStatus
    ) {
      this.setState({ updatingCourseId: null });
    }
  }

  generateColumns(courses) {
    if (!courses || courses.length === 0) return [];

    const sttColumn = {
      title: "STT",
      key: "stt",
      width: 60,
      fixed: "left",
      render: (text, record, index) => index + 1,
    };

    const columns = [
      {
        title: "Tên khóa học",
        dataIndex: "name",
        key: "name",
        width: 200,
        render: (text) => text || "Chưa cập nhật",
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
        width: 300,
        render: (text) => text || "Chưa cập nhật",
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
                loading={this.state.updatingCourseId === record.key}
                onClick={() =>
                  this.handleUpdateStatus(record.key, record.status)
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

  handleUpdateStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? -1 : 1;
    this.setState({ updatingCourseId: id });
    this.props.updateCourseStatus(id, newStatus);
  };

  render() {
    const { courses, columns } = this.state;

    return (
      <DataManagementPage
        title="Quản lý khóa học"
        subtitle="Xem và quản lý danh sách khóa học trong hệ thống."
        columns={columns}
        data={courses}
        rowKey="key"
        loading={this.props.gettingCourseList}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.courseReducer.gettingCourseList,
    gettingCourseList: state.courseReducer.gettingCourseList,
    getCourseListSuccess: state.courseReducer.getCourseListSuccess,
    getCourseListFailure: state.courseReducer.getCourseListFailureMsg,
    courses: state.courseReducer.courseList,
    updateCourseStatusSuccess: state.courseReducer.updateCourseStatusSuccess,
    updateCourseStatusFailure: state.courseReducer.updateCourseStatusFailureMsg,
    updatingCourseStatus: state.courseReducer.updatingCourseStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourseList: () => dispatch(fetchCourseList()),
    updateCourseStatus: (key, status) =>
      dispatch(updateCourseStatus(key, status)),
    addCourse: (values) => dispatch(addCourse(values)),
    updateCourse: (values) => dispatch(updateCourse(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseManagement);