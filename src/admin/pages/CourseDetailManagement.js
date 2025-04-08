import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import { connect } from "react-redux";
import {
  fetchCourseDetailList,
  addCourseDetail,
  updateCourseDetail,
  setCurrentCourseDetail,
} from "src/store/actions/courseDetail/courseDetailActions.js";
import { message } from "antd";
import {
  fetchMentorList,
  fetchStudentList,
  fetchUserList,
} from "src/store/actions/user/userActions.js";
import { fetchCourseList } from "src/store/actions/course/courseActions.js";
import withNavigate from "../../store/HOC/withNavigate.js"; // Import HOC

class CourseDetailManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseDetails: [],
      columns: [],
      hasFetchedAdditionalData: false, // Cờ để kiểm soát việc fetch
    };
  }

  componentDidMount() {
    this.props.fetchCourseDetailList();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.fetchCourseDetailSuccess &&
      prevProps.courseDetails !== this.props.courseDetails &&
      Array.isArray(this.props.courseDetails)
    ) {
      const courseDetailsData = this.props.courseDetails.map(
        (courseDetail, index) => ({
          ...courseDetail,
          key: courseDetail._id || `courseDetail-${index}`,
        })
      );

      const dynamicColumns = this.generateColumns(courseDetailsData);

      this.setState({
        courseDetails: courseDetailsData,
        columns: dynamicColumns,
      });
    }

    // Fetch additional data only once
    if (
      this.props.fetchCourseDetailSuccess &&
      !this.state.hasFetchedAdditionalData
    ) {
      if (!this.props.courses.length) {
        this.props.fetchCourseList();
      }
      if (!this.props.students.length) {
        this.props.fetchStudentList();
      }
      if (!this.props.mentors.length) {
        this.props.fetchMentorList();
      }

      this.setState({ hasFetchedAdditionalData: true }); // Đánh dấu đã fetch
    }
  }

  generateColumns(courseDetails) {
    if (!courseDetails || courseDetails.length === 0) return [];

    const sttColumn = {
      title: "STT",
      key: "stt",
      width: 60,
      fixed: "left",
      render: (text, record, index) => index + 1,
    };

    const { navigate } = this.props; // Destructure navigate from props

    const columns = [
      {
        title: "Tên khóa học",
        dataIndex: ["course", "name"],
        key: "course.name",
        width: 200,
        render: (text) => text || "Chưa cập nhật",
      },
      {
        title: "Học viên",
        dataIndex: ["student", "email"],
        key: "student.email",
        width: 200,
        render: (text) => text || "Chưa cập nhật",
      },
      {
        title: "Giáo viên",
        dataIndex: ["teacher", "email"],
        key: "teacher.email",
        width: 200,
        render: (text) => text || "Chưa cập nhật",
      },
      {
        title: "Học phí thực tế",
        dataIndex: "actualFee",
        key: "actualFee",
        width: 150,
        render: (text) =>
          text ? `${text.toLocaleString()} VND` : "Không xác định",
      },
      {
        title: "Đã thanh toán",
        dataIndex: "Paid",
        key: "Paid",
        width: 150,
        render: (text) =>
          text ? `${text.toLocaleString()} VND` : "Không xác định",
      },
      {
        title: "Số buổi đã học",
        dataIndex: "numberOfStudied",
        key: "numberOfStudied",
        width: 150,
        render: (text) => text || "Không xác định",
      },
      {
        title: "Môn học",
        dataIndex: ["course", "cubeSubject", "name"],
        key: "course.cubeSubject.name",
        width: 200,
        render: (text) => text || "Chưa cập nhật",
      },
      {
        title: "Cấp độ",
        dataIndex: ["course", "level", "name"],
        key: "course.level.name",
        width: 150,
        render: (text) => text || "Chưa cập nhật",
      },
      {
        title: "Số buổi học",
        dataIndex: ["course", "numOfSessions"],
        key: "course.numOfSessions",
        width: 150,
        render: (text) => text || "Không xác định",
      },
      {
        title: "Lịch học",
        key: "_id",
        width: 150,
        render: (text, record) => (
          <button
            onClick={() => {
              this.props.setCurrentCourseDetail(record._id);
              navigate("/admin/session/" + record._id);
            }}
            style={{
              backgroundColor: "#1890ff",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Chi tiết
          </button>
        ),
      },
    ];

    return [sttColumn, ...columns];
  }

  formFields = () => [
    {
      name: "course",
      label: "Khóa học",
      placeholder: "Chọn khóa học",
      type: "select",
      options: Array.isArray(this.props.courses)
        ? this.props.courses.map((course) => ({
            label: course.name,
            value: course._id,
          }))
        : [],
      rules: [{ required: true, message: "Vui lòng chọn khóa học!" }],
    },
    {
      name: "student",
      label: "Học viên",
      placeholder: "Chọn học viên",
      type: "select",
      options: Array.isArray(this.props.students)
        ? this.props.students.map((student) => ({
            label: student.email,
            value: student._id,
          }))
        : [],
      rules: [{ required: true, message: "Vui lòng chọn học viên!" }],
    },
    {
      name: "teacher",
      label: "Giáo viên",
      placeholder: "Chọn giáo viên",
      type: "select",
      options: Array.isArray(this.props.mentors)
        ? this.props.mentors.map((teacher) => ({
            label: teacher.email,
            value: teacher._id,
          }))
        : [],
      rules: [{ required: true, message: "Vui lòng chọn giáo viên!" }],
    },
  ];

  handleAdd = (values) => {
    this.props
      .addCourseDetail(values)
      .then(() => {
        message.success("Thêm lớp học thành công!");
      })
      .catch((error) => {
        message.error(error || "Thêm lớp học thất bại!");
      });
  };

  handleUpdate = (values) => {
    this.props
      .updateCourseDetail(values)
      .then(() => {
        message.success("Cập nhật lớp học thành công!");
      })
      .catch((error) => {
        message.error(error || "Cập nhật lớp học thất bại!");
      });
  };

  handleViewSessionDetails = (sessions) => {
    console.log("sessions", sessions.courseDetailId);
    this.props.setCurrentCourseDetail(sessions.courseDetailId);
    if (!sessions || sessions.length === 0) {
      message.info("Không có lịch học nào.");
      return;
    }

    console.log("Chi tiết lịch học:", sessions);
    // Có thể hiển thị modal hoặc giao diện chi tiết ở đây
  };

  handleFormOpen = () => {
    if (!this.props.courses.length) {
      this.props.fetchCourseList();
    }
    if (!this.props.students.length) {
      this.props.fetchStudentList();
    }
    if (!this.props.mentors.length) {
      this.props.fetchMentorList();
    }
  };

  render() {
    const { courseDetails, columns } = this.state;
    const { navigate } = this.props; // Nhận navigate từ props

    return (
      <DataManagementPage
        title="Quản lý lớp học"
        subtitle="Xem và quản lý danh sách lớp học trong hệ thống."
        columns={columns}
        data={courseDetails}
        rowKey="key"
        loading={this.props.loading}
        formFields={this.formFields()} // Truyền formFields
        onAdd={this.handleAdd} // Truyền hàm handleAdd
        onUpdate={this.handleUpdate} // Truyền hàm handleUpdate
        callback={() => navigate("/admin/classes/add/one-on-one")} // Sử dụng navigate để điều hướng
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    courseDetails: state.courseDetailReducer.courseDetails || [],
    loading: state.courseDetailReducer.loading,
    fetchCourseDetailSuccess: state.courseDetailReducer.fetchSuccess,
    fetchCourseDetailFailure: state.courseDetailReducer.fetchFailure,
    fetchUserSuccess: state.userReducer.fetchUserSuccess,
    fetchUserFailure: state.userReducer.fetchUserFailureMsg,
    fetchCourseSuccess: state.courseReducer.fetchCourseSuccess,
    fetchCourseFailure: state.courseReducer.fetchCourseFailureMsg,
    courses: state.courseReducer.courses || [],
    students: state.userReducer.students || [],
    mentors: state.userReducer.mentors || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourseDetailList: () => dispatch(fetchCourseDetailList()),
    addCourseDetail: (values) => dispatch(addCourseDetail(values)),
    updateCourseDetail: (values) => dispatch(updateCourseDetail(values)),
    fetchUserList: () => dispatch(fetchUserList()),
    fetchCourseList: () => dispatch(fetchCourseList()),
    fetchStudentList: () => dispatch(fetchStudentList()),
    fetchMentorList: () => dispatch(fetchMentorList()),
    setCurrentCourseDetail: (courseDetail) =>
      dispatch(setCurrentCourseDetail(courseDetail)),
  };
};

// Bọc component với connect và withNavigate
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigate(CourseDetailManagement));
