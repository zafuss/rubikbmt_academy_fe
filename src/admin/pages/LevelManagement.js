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
    if (
      this.props.getLevelListSuccess &&
      prevProps.levels !== this.props.levels &&
      Array.isArray(this.props.levels.data) &&
      this.props.levels.data.length > 0
    ) {
      const levelsData = this.props.levels.data.map((level, index) => ({
        ...level,
        key: level._id || `level-${index}`,
      }));

      const dynamicColumns = this.generateColumns(levelsData);

      this.setState({
        levels: levelsData,
        columns: dynamicColumns,
      });
    }

    if (
      !prevProps.updateLevelStatusSuccess &&
      this.props.updateLevelStatusSuccess
    ) {
      message.success("Cập nhật trạng thái thành công!");
      this.props.fetchLevelList();
    }

    if (
      !prevProps.updateLevelStatusFailure &&
      this.props.updateLevelStatusFailure
    ) {
      message.error(
        this.props.updateLevelStatusFailure || "Cập nhật trạng thái thất bại!"
      );
    }

    if (
      this.props.updatingLevelStatus !== prevProps.updatingLevelStatus &&
      !this.props.updatingLevelStatus
    ) {
      this.setState({ updatingLevelId: null });
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
                loading={this.state.updatingLevelId === record.key}
                onClick={() => this.handleUpdateStatus(record.key, record.status)}
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
  return {
    loading: state.levelReducer.gettingLevelList,
    gettingLevelList: state.levelReducer.gettingLevelList,
    getLevelListSuccess: state.levelReducer.getLevelListSuccess,
    getLevelListFailure: state.levelReducer.getLevelListFailureMsg,
    levels: state.levelReducer.levelList,
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