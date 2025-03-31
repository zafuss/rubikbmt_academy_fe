import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import { connect } from "react-redux";
import {
  addCubeSkill,
  fetchCubeSkillList,
  updateCubeSkill,
  updateCubeSkillStatus,
} from "src/store/actions/cubeSkill/cubeSkillActions.js";
import { Space, Button, message, Spin } from "antd";

class CubeSkillManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeSkills: [],
      columns: [],
      updatingSkillId: null,
    };
  }

  componentDidMount() {
    this.props.fetchCubeSkillList();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.getCubeSkillListSuccess &&
      prevProps.cubeSkills !== this.props.cubeSkills &&
      Array.isArray(this.props.cubeSkills.data) &&
      this.props.cubeSkills.data.length > 0
    ) {
      const cubeSkillsData = this.props.cubeSkills.data.map((skill, index) => ({
        ...skill,
        key: skill._id || `skill-${index}`,
      }));

      const dynamicColumns = this.generateColumns(cubeSkillsData);

      this.setState({
        cubeSkills: cubeSkillsData,
        columns: dynamicColumns,
      });
    }

    if (
      !prevProps.updateCubeSkillStatusSuccess &&
      this.props.updateCubeSkillStatusSuccess
    ) {
      message.success("Cập nhật trạng thái thành công!");
      this.props.fetchCubeSkillList();
    }

    if (
      !prevProps.updateCubeSkillStatusFailure &&
      this.props.updateCubeSkillStatusFailure
    ) {
      message.error(
        this.props.updateCubeSkillStatusFailure || "Cập nhật trạng thái thất bại!"
      );
    }

    if (
      this.props.updatingCubeSkillStatus !== prevProps.updatingCubeSkillStatus &&
      !this.props.updatingCubeSkillStatus
    ) {
      this.setState({ updatingSkillId: null });
    }
  }

  generateColumns(cubeSkills) {
    if (!cubeSkills || cubeSkills.length === 0) return [];

    const sttColumn = {
      title: "STT",
      key: "stt",
      width: 60,
      fixed: "left",
      render: (text, record, index) => index + 1,
    };

    const columns = [
      {
        title: "Tên kỹ năng",
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
                loading={this.state.updatingSkillId === record.key}
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
      label: "Tên kỹ năng",
      placeholder: "Nhập tên kỹ năng",
      rules: [{ required: true, message: "Vui lòng nhập tên kỹ năng!" }],
    },
    {
      name: "description",
      label: "Mô tả",
      placeholder: "Nhập mô tả kỹ năng",
      rules: [{ required: true, message: "Vui lòng nhập mô tả!" }],
    },
  ];

  handleAdd = (values) => {
    this.props.addCubeSkill(values);
  };

  handleUpdate = (values) => {
    this.props.updateCubeSkill(values);
  };

  handleUpdateStatus = (key, currentStatus) => {
    const newStatus = currentStatus === 1 ? -1 : 1;
    this.setState({ updatingSkillId: key });
    this.props.updateCubeSkillStatus(key, newStatus);
  };

  render() {
    const { cubeSkills, columns } = this.state;

    return (
      <DataManagementPage
        title="Quản lý kỹ năng Rubik"
        subtitle="Xem và quản lý danh sách kỹ năng Rubik trong hệ thống."
        columns={columns}
        data={cubeSkills}
        rowKey="key"
        onAdd={this.handleAdd}
        onUpdate={this.handleUpdate}
        formFields={this.formFields}
        loading={this.props.gettingCubeSkillList}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.cubeSkillReducer.gettingCubeSkillList,
    gettingCubeSkillList: state.cubeSkillReducer.gettingCubeSkillList,
    getCubeSkillListSuccess: state.cubeSkillReducer.getCubeSkillListSuccess,
    getCubeSkillListFailure: state.cubeSkillReducer.getCubeSkillListFailureMsg,
    cubeSkills: state.cubeSkillReducer.cubeSkillList,
    updateCubeSkillStatusSuccess:
      state.cubeSkillReducer.updateCubeSkillStatusSuccess,
    updateCubeSkillStatusFailure:
      state.cubeSkillReducer.updateCubeSkillStatusFailureMsg,
    updatingCubeSkillStatus: state.cubeSkillReducer.updatingCubeSkillStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCubeSkillList: () => dispatch(fetchCubeSkillList()),
    updateCubeSkillStatus: (key, status) =>
      dispatch(updateCubeSkillStatus(key, status)),
    addCubeSkill: (values) => dispatch(addCubeSkill(values)),
    updateCubeSkill: (values) => dispatch(updateCubeSkill(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CubeSkillManagement);