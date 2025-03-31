import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import { connect } from "react-redux";
import {
  addCubeSubject,
  fetchCubeSubjectList,
  updateCubeSubject,
  updateCubeSubjectStatus,
} from "src/store/actions/cubeSubject/cubeSubjectActions.js";
import { Space, Button, message, Spin } from "antd";

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
    this.props.fetchCubeSubjectList();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.getCubeSubjectListSuccess &&
      prevProps.cubeSubjects !== this.props.cubeSubjects &&
      Array.isArray(this.props.cubeSubjects.data) &&
      this.props.cubeSubjects.data.length > 0
    ) {
      const cubeSubjectsData = this.props.cubeSubjects.data.map(
        (subject, index) => ({
          ...subject,
          key: subject._id || `subject-${index}`,
        })
      );

      const dynamicColumns = this.generateColumns(cubeSubjectsData);

      this.setState({
        cubeSubjects: cubeSubjectsData,
        columns: dynamicColumns,
      });
    }

    if (
      !prevProps.updateCubeSubjectStatusSuccess &&
      this.props.updateCubeSubjectStatusSuccess
    ) {
      message.success("Cập nhật trạng thái thành công!");
      this.props.fetchCubeSubjectList();
    }

    if (
      !prevProps.updateCubeSubjectStatusFailure &&
      this.props.updateCubeSubjectStatusFailure
    ) {
      message.error(
        this.props.updateCubeSubjectStatusFailure ||
          "Cập nhật trạng thái thất bại!"
      );
    }

    if (
      this.props.updatingCubeSubjectStatus !==
        prevProps.updatingCubeSubjectStatus &&
      !this.props.updatingCubeSubjectStatus
    ) {
      this.setState({ updatingSubjectId: null });
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
        title: "Tên bộ môn",
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
                loading={this.state.updatingSubjectId === record.key}
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

  formFields = [
    {
      name: "name",
      label: "Tên bộ môn",
      placeholder: "Nhập tên bộ môn",
      rules: [{ required: true, message: "Vui lòng nhập tên bộ môn!" }],
    },
    {
      name: "description",
      label: "Mô tả",
      placeholder: "Nhập mô tả bộ môn",
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

    return (
      <DataManagementPage
        title="Quản lý bộ môn Rubik"
        subtitle="Xem và quản lý danh sách bộ môn Rubik trong hệ thống."
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
  return {
    loading: state.cubeSubjectReducer.gettingCubeSubjectList,
    gettingCubeSubjectList: state.cubeSubjectReducer.gettingCubeSubjectList,
    getCubeSubjectListSuccess:
      state.cubeSubjectReducer.getCubeSubjectListSuccess,
    getCubeSubjectListFailure:
      state.cubeSubjectReducer.getCubeSubjectListFailureMsg,
    cubeSubjects: state.cubeSubjectReducer.cubeSubjectList,
    updateCubeSubjectStatusSuccess:
      state.cubeSubjectReducer.updateCubeSubjectStatusSuccess,
    updateCubeSubjectStatusFailure:
      state.cubeSubjectReducer.updateCubeSubjectStatusFailureMsg,
    updatingCubeSubjectStatus:
      state.cubeSubjectReducer.updatingCubeSubjectStatus,
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