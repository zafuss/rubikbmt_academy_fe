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
    console.log("Prev Props CubeSkills:", prevProps.cubeSkills);
    console.log("Current Props CubeSkills:", this.props.cubeSkills);
    console.log("getCubeSkillListSuccess:", this.props.getCubeSkillListSuccess);
    console.log("CubeSkills changed:", prevProps.cubeSkills !== this.props.cubeSkills);
    console.log("Is Array:", Array.isArray(this.props.cubeSkills));
    console.log("CubeSkills length > 0:", this.props.cubeSkills.length > 0);

    if (
      this.props.getCubeSkillListSuccess &&
      prevProps.cubeSkills !== this.props.cubeSkills &&
      Array.isArray(this.props.cubeSkills) &&
      this.props.cubeSkills.length > 0
    ) {
      const cubeSkillsData = this.props.cubeSkills.map((skill, index) => ({
        ...skill,
        key: skill.id || `skill-${index}`, // Đảm bảo mỗi kỹ năng có key duy nhất
      }));

      const dynamicColumns = this.generateColumns(cubeSkillsData);

      this.setState(
        {
          cubeSkills: cubeSkillsData,
          columns: dynamicColumns,
        },
        () => {
          console.log("Updated State CubeSkills:", this.state.cubeSkills);
          console.log("Updated State Columns:", this.state.columns);
        }
      );
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
    console.log("Columns:", columns); // Kiểm tra cấu trúc cột
    console.log("CubeSkills:", cubeSkills); // Kiểm tra dữ liệu

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
  console.log("Redux state:", state.cubeSkillReducer);
  return {
    cubeSkills: state.cubeSkillReducer.cubeSkillList,
    gettingCubeSkillList: state.cubeSkillReducer.gettingCubeSkillList,
    getCubeSkillListSuccess: state.cubeSkillReducer.getCubeSkillListSuccess,
    getCubeSkillListFailure: state.cubeSkillReducer.getCubeSkillListFailureMsg,
    updateCubeSkillStatusSuccess: state.cubeSkillReducer.updateCubeSkillStatusSuccess,
    updateCubeSkillStatusFailure: state.cubeSkillReducer.updateCubeSkillStatusFailureMsg,
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