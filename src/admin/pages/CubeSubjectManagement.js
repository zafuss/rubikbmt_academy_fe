import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import { connect } from "react-redux";
import {
  addCubeSubject,
  fetchCubeSubjectList,
  updateCubeSubject,
  updateCubeSubjectStatus,
} from "src/store/actions/cubeSubject/cubeSubjectActions.js";

class CubeSubjectManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeSubjects: [],
      columns: [],
      updatingSubjectId: null,
    };
  }

  componentDidMount() {
    console.log("Fetching Cube Subjects...");
    console.log("Props in DataManagementPage:", this.props);
    this.props.fetchCubeSubjectList();
  }

  componentDidUpdate(prevProps) {
  console.log("getCubeSubjectListSuccess:", this.props.getCubeSubjectListSuccess);
  console.log("Prev Props CubeSubjects:", prevProps.cubeSubjects);
  console.log("Current Props CubeSubjects:", this.props.cubeSubjects);


  if (
    this.props.getCubeSubjectListSuccess &&
    prevProps.cubeSubjects !== this.props.cubeSubjects &&
    Array.isArray(this.props.cubeSubjects) &&
    this.props.cubeSubjects.length > 0
  ) {
    const cubeSubjectsData = this.props.cubeSubjects.map((subject, index) => ({
      ...subject,
      key: subject._id || `subject-${index}`, // Đảm bảo mỗi chủ đề có key duy nhất
    }));

    console.log("Processed CubeSubjects Data:", cubeSubjectsData);

    const dynamicColumns = this.generateColumns(cubeSubjectsData);

    this.setState(
      {
        cubeSubjects: cubeSubjectsData,
        columns: dynamicColumns,
      },
      () => {
        console.log("Updated State CubeSubjects:", this.state.cubeSubjects);
        console.log("Updated State Columns:", this.state.columns);
      }
    );
  }
}

  generateColumns(cubeSubjects) {
  if (!cubeSubjects || cubeSubjects.length === 0) return [];

  const sttColumn = {
    title: "STT",
    key: "stt",
    width: 60,
    fixed: "left",
    render: (text, record, index) => index + 1,
  };

  const columns = [
    {
      title: "Tên chủ đề",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text) => text || "Chưa cập nhật", // Hiển thị "Chưa cập nhật" nếu text là null hoặc undefined
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
        const statusText = record.status === 1 ? "Hoạt động" : "Không hoạt động";
        return <span>{statusText}</span>;
      },
    },
  ];

  console.log("Generated Columns:", [sttColumn, ...columns]);
  return [sttColumn, ...columns];
}

  formFields = [
    {
      name: "name",
      label: "Tên chủ đề",
      placeholder: "Nhập tên chủ đề",
      rules: [{ required: true, message: "Vui lòng nhập tên chủ đề!" }],
    },
    {
      name: "description",
      label: "Mô tả",
      placeholder: "Nhập mô tả chủ đề",
      rules: [{ required: true, message: "Vui lòng nhập mô tả!" }],
    },
  ];

  handleAdd = (values) => {
    this.props.addCubeSubject(values);
  };

  handleUpdate = (values) => {
    this.props.updateCubeSubject(values);
  };

  handleUpdateStatus = (key, currentStatus) => {
    const newStatus = currentStatus === 1 ? -1 : 1;
    this.setState({ updatingSubjectId: key });
    this.props.updateCubeSubjectStatus(key, newStatus);
  };

  render() {
    const { cubeSubjects, columns } = this.state;
    console.log("Columns:", columns); // Kiểm tra cấu trúc cột
    console.log("CubeSubjects:", cubeSubjects); // Kiểm tra dữ liệu

    return (
      <DataManagementPage
        title="Quản lý chủ đề Rubik"
        subtitle="Xem và quản lý danh sách chủ đề Rubik trong hệ thống."
        columns={columns}
        data={cubeSubjects}
        rowKey="key"
        onAdd={this.handleAdd}
        onUpdate={this.handleUpdate}
        formFields={this.formFields}
        loading={this.props.gettingCubeSubjectList}
      />
    );
  }
}

const mapStateToProps = (state) => {
  console.log("Redux state in CubeSubjectManagement:", state); // Kiểm tra toàn bộ Redux state
  return {
    cubeSubjects: state.cubeSubjectReducer?.cubeSubjectList || [], // Đảm bảo không bị undefined
    gettingCubeSubjectList: state.cubeSubjectReducer?.gettingCubeSubjectList || false,
    getCubeSubjectListSuccess: state.cubeSubjectReducer?.getCubeSubjectListSuccess || false,
    getCubeSubjectListFailure: state.cubeSubjectReducer?.getCubeSubjectListFailureMsg || "",
    updateCubeSubjectStatusSuccess: state.cubeSubjectReducer?.updateCubeSubjectStatusSuccess || false,
    updateCubeSubjectStatusFailure: state.cubeSubjectReducer?.updateCubeSubjectStatusFailureMsg || "",
    updatingCubeSubjectStatus: state.cubeSubjectReducer?.updatingCubeSubjectStatus || false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCubeSubjectList: () => dispatch(fetchCubeSubjectList()),
    updateCubeSubjectStatus: (key, status) =>
      dispatch(updateCubeSubjectStatus(key, status)),
    addCubeSubject: (values) => dispatch(addCubeSubject(values)),
    updateCubeSubject: (values) => dispatch(updateCubeSubject(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CubeSubjectManagement);