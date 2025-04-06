import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import { connect } from "react-redux";
import {
  addCourse,
  fetchCourseList,
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
    console.log("Prev Props Courses:", prevProps.courses);
    console.log("Current Props Courses:", this.props.courses);
    console.log("getCourseListSuccess:", this.props.getCourseListSuccess);
    console.log("Courses changed:", prevProps.courses !== this.props.courses);
    console.log("Is Array:", Array.isArray(this.props.courses));
    console.log("Courses length > 0:", this.props.courses.length > 0);

    if (
      this.props.getCourseListSuccess &&
      prevProps.courses !== this.props.courses &&
      Array.isArray(this.props.courses) &&
      this.props.courses.length > 0
    ) {
      const coursesData = this.props.courses.map((course, index) => ({
        ...course,
        key: course.id || `course-${index}`, // Đảm bảo mỗi khóa học có key duy nhất
      }));

      const dynamicColumns = this.generateColumns(coursesData);

      this.setState(
        {
          courses: coursesData,
          columns: dynamicColumns,
        },
        () => {
          console.log("Updated State Courses:", this.state.courses);
          console.log("Updated State Columns:", this.state.columns);
        }
      );
    }
  }

  render() {
  return (
    <div>
      <h1>Quản lý khóa học</h1>
      <DataManagementPage
        data={this.state.courses}
        columns={this.state.columns}
        formFields={this.formFields}
        onAdd={this.props.addCourse}
        onUpdate={this.props.updateCourse}
        loading={this.props.gettingCourseList}
      />
    </div>
  );
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
      title: "Yêu cầu",
      dataIndex: "requirements",
      key: "requirements",
      width: 200,
      render: (text) => text || "Chưa cập nhật",
    },
    {
      title: "Mục tiêu",
      dataIndex: "target",
      key: "target",
      width: 200,
      render: (text) => text || "Chưa cập nhật",
    },
    {
      title: "Chủ đề Rubik",
      dataIndex: "cubeSubject",
      key: "cubeSubject",
      width: 200,
      render: (cubeSubject) => cubeSubject?.name || "Không xác định",
    },
    {
      title: "Cấp độ",
      dataIndex: "level",
      key: "level",
      width: 150,
      render: (level) => level?.name || "Không xác định",
    },
    {
      title: "Kỹ năng Rubik",
      dataIndex: "cubeSkill",
      key: "cubeSkill",
      width: 300,
      render: (cubeSkill) =>
        cubeSkill && Array.isArray(cubeSkill)
          ? cubeSkill.map((skill) => skill.name).join(", ")
          : "Không xác định",
    },
    {
      title: "Độ tuổi tối thiểu",
      dataIndex: "min_age",
      key: "min_age",
      width: 150,
      render: (text) => text || "Không xác định",
    },
    {
      title: "Độ tuổi tối đa",
      dataIndex: "max_age",
      key: "max_age",
      width: 150,
      render: (text) => text || "Không xác định",
    },
    {
      title: "Thời gian mỗi buổi (phút)",
      dataIndex: "minutesPerSession",
      key: "minutesPerSession",
      width: 200,
      render: (text) => text || "Không xác định",
    },
    {
      title: "Số buổi học",
      dataIndex: "numOfSessions",
      key: "numOfSessions",
      width: 150,
      render: (text) => text || "Không xác định",
    },
    {
      title: "Học phí",
      dataIndex: "fee",
      key: "fee",
      width: 150,
      render: (text) => (text ? `${text.toLocaleString()} VND` : "Không xác định"),
    },
    {
      title: "Trạng thái",
      key: "status",
      width: 150,
      render: (text, record) => {
        const statusText = record.status === 1 ? "Hoạt động" : "Không hoạt động";
        return <span>{statusText}</span>;
      },
    },
  ];

  return [sttColumn, ...columns];
}
  formFields = [
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
    name: "requirements",
    label: "Yêu cầu",
    placeholder: "Nhập yêu cầu của khóa học",
    rules: [{ required: true, message: "Vui lòng nhập yêu cầu!" }],
  },
  {
    name: "target",
    label: "Mục tiêu",
    placeholder: "Nhập mục tiêu của khóa học",
    rules: [{ required: true, message: "Vui lòng nhập mục tiêu!" }],
  },
  {
    name: "min_age",
    label: "Độ tuổi nhỏ nhất",
    placeholder: "Nhập độ tuổi nhỏ nhất",
    type: "number",
    rules: [{ required: true, message: "Vui lòng nhập độ tuổi nhỏ nhất!" }],
  },
  {
    name: "max_age",
    label: "Độ tuổi tối đa",
    placeholder: "Nhập độ tuổi tối đa",
    type: "number",
    rules: [{ required: true, message: "Vui lòng nhập độ tuổi tối đa!" }],
  },
  {
    name: "minutesPerSession",
    label: "Thời gian mỗi buổi học (phút)",
    placeholder: "Nhập thời gian mỗi buổi học",
    type: "number",
    rules: [{ required: true, message: "Vui lòng nhập thời gian mỗi buổi học!" }],
  },
  {
    name: "numOfSessions",
    label: "Số buổi học",
    placeholder: "Nhập số buổi học",
    type: "number",
    rules: [{ required: true, message: "Vui lòng nhập số buổi học!" }],
  },
  {
    name: "fee",
    label: "Học phí",
    placeholder: "Nhập học phí",
    type: "number",
    rules: [{ required: true, message: "Vui lòng nhập học phí!" }],
  },
  {
    name: "cubeSubject",
    label: "Chủ đề Rubik",
    placeholder: "Chọn chủ đề Rubik",
    type: "select",
    options: this.props.cubeSubjects.map((subject) => ({
      label: subject.name,
      value: subject._id,
    })),
    rules: [{ required: true, message: "Vui lòng chọn chủ đề Rubik!" }],
  },
  {
    name: "level",
    label: "Cấp độ",
    placeholder: "Chọn cấp độ",
    type: "select",
    options: this.props.levels.map((level) => ({
      label: level.name,
      value: level._id,
    })),
    rules: [{ required: true, message: "Vui lòng chọn cấp độ!" }],
  },
];
  
}

const mapStateToProps = (state) => {
  return {
    courses: state.courseReducer.courseList || [],
    cubeSubjects: state.cubeSubjectReducer.cubeSubjectList || [], // Đảm bảo không undefined
    levels: state.levelReducer.levelList || [], // Đảm bảo không undefined
    gettingCourseList: state.courseReducer.gettingCourseList,
    getCourseListSuccess: state.courseReducer.getCourseListSuccess,
    getCourseListFailure: state.courseReducer.getCourseListFailureMsg,
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