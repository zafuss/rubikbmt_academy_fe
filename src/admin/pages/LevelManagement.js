import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import { connect } from "react-redux";
import {
  addLevel,
  fetchLevelList,
  updateLevel,
  updateLevelStatus,
} from "src/store/actions/level/levelActions.js";
import { Space, Button, message, Spin } from "antd";

class LevelManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: [],
      columns: [],
      updatingLevelId: null,
    };
  }

  componentDidMount() {
    this.props.fetchLevelList();
  }

 componentDidUpdate(prevProps) {
  console.log("Prev Props Levels:", prevProps.levels);
  console.log("Current Props Levels:", this.props.levels);
  console.log("getLevelListSuccess:", this.props.getLevelListSuccess);
  console.log("Levels changed:", prevProps.levels !== this.props.levels);
  console.log("Is Array:", Array.isArray(this.props.levels));
  console.log("Levels length > 0:", this.props.levels.length > 0);
  if (
    this.props.getLevelListSuccess &&
    prevProps.levels !== this.props.levels &&
    Array.isArray(this.props.levels) && // Kiểm tra trực tiếp levels
    this.props.levels.length > 0
  ) {
    const levelsData = this.props.levels.map((level, index) => ({
      ...level,
      key: level.id || `level-${index}`, // Đảm bảo mỗi cấp độ có key duy nhất
    }));

    const dynamicColumns = this.generateColumns(levelsData);

    this.setState({
      levels: levelsData,
      columns: dynamicColumns,
    }, () => {
      console.log("Updated State Levels:", this.state.levels);
      console.log("Updated State Columns:", this.state.columns);
    });
  }
}

  generateColumns(levels) {
  if (!levels || levels.length === 0) return [];

  const sttColumn = {
    title: "STT",
    key: "stt",
    width: 60,
    fixed: "left",
    render: (text, record, index) => index + 1,
  };

  const columns = [
    {
      title: "Tên cấp độ",
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
  ];

  return [sttColumn, ...columns];
}

  formFields = [
    {
      name: "name",
      label: "Tên cấp độ",
      placeholder: "Nhập tên cấp độ",
      rules: [{ required: true, message: "Vui lòng nhập tên cấp độ!" }],
    },
    {
      name: "description",
      label: "Mô tả",
      placeholder: "Nhập mô tả cấp độ",
      rules: [{ required: true, message: "Vui lòng nhập mô tả!" }],
    },
  ];

  handleAdd = (values) => {
    this.props.addLevel(values);
  };

  handleUpdate = (values) => {
    this.props.updateLevel(values);
  };


  handleUpdateStatus = (key, currentStatus) => {
    const newStatus = currentStatus === 1 ? -1 : 1;
    this.setState({ updatingLevelId: key });
    this.props.updateLevelStatus(key, newStatus);
  };

  render() {
    const { levels, columns } = this.state;
    console.log("Columns:", columns); // Kiểm tra cấu trúc cột
    console.log("Levels:", levels);   // Kiểm tra dữ liệu


    return (
      <DataManagementPage
        title="Quản lý cấp độ Rubik"
        subtitle="Xem và quản lý danh sách cấp độ Rubik trong hệ thống."
        columns={columns}
        data={levels}
        rowKey="key"
        onAdd={this.handleAdd}
        onUpdate={this.handleUpdate}
        formFields={this.formFields}
        loading={this.props.gettingLevelList}
      />
    );
  }
}

const mapStateToProps = (state) => {
   console.log("Redux state:", state.levelReducer);
  return {
    loading: state.levelReducer.gettingLevelList,
    gettingLevelList: state.levelReducer.gettingLevelList,
    getLevelListSuccess: state.levelReducer.getLevelListSuccess,
    getLevelListFailure: state.levelReducer.getLevelListFailureMsg,
    levels: state.levelReducer.levelList, // Sử dụng trực tiếp levelList
    updateLevelStatusSuccess: state.levelReducer.updateLevelStatusSuccess,
    updateLevelStatusFailure: state.levelReducer.updateLevelStatusFailureMsg,
    updatingLevelStatus: state.levelReducer.updatingLevelStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLevelList: () => dispatch(fetchLevelList()),
    updateLevelStatus: (key, status) =>
      dispatch(updateLevelStatus(key, status)),
    addLevel: (values) => dispatch(addLevel(values)),
    updateLevel: (values) => dispatch(updateLevel(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelManagement);