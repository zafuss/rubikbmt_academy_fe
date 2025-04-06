import React, { Component } from "react";
import DataManagementPage from "../components/DataManagementPage.js";
import { connect } from "react-redux";
import {
  addCubeSubject,
  fetchCubeSubjectList,
  updateCubeSubject,
  updateCubeSubjectStatus,
} from "src/store/actions/cubeSubject/cubeSubjectActions.js";
import { fetchCubeSkillList } from "src/store/actions/cubeSkill/cubeSkillActions.js"; // Import action này
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
  this.props.fetchCubeSubjectList();
  this.props.fetchCubeSkillList(); // Gọi action để lấy danh sách Cube Skill
}

 componentDidUpdate(prevProps) {
  if (
    this.props.getCubeSubjectListSuccess &&
    prevProps.cubeSubjects !== this.props.cubeSubjects &&
    Array.isArray(this.props.cubeSubjects) &&
    this.props.cubeSubjects.length > 0
  ) {
    this.setState({ cubeSkills: this.props.cubeSkills });
    const cubeSubjectsData = this.props.cubeSubjects.map((subject, index) => {
      // Chuyển đổi subject.cubeSkills thành mảng các ID kỹ năng
      const subjectCubeSkills = Array.isArray(subject.cubeSkills)
        ? subject.cubeSkills.map((skill) =>
            typeof skill === "object" && skill._id ? skill._id.toString() : skill.toString()
          )
        : [];

      // Lọc các kỹ năng liên quan
      const relatedSkills = this.props.cubeSkills.filter((skill) =>
        subjectCubeSkills.includes(skill._id.toString())
      );

      console.log("Subject CubeSkills:", subjectCubeSkills);
      console.log("Related Skills for Subject:", subject.name, relatedSkills);

      return {
        ...subject,
        skills: relatedSkills.map((skill) => skill.name).join(", "), // Ghép tên kỹ năng thành chuỗi
        key: subject._id || `subject-${index}`,
      };
    });

    const dynamicColumns = this.generateColumns(cubeSubjectsData);

    this.setState({
      cubeSubjects: cubeSubjectsData,
      columns: dynamicColumns,
    });
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
  title: "Cube Skill",
  dataIndex: "skills", // Sử dụng 'skills' đã được xử lý
  key: "skills",
  width: 300,
  render: (text) => text || "Không có kỹ năng liên quan", // Hiển thị chuỗi kỹ năng hoặc thông báo mặc định
}
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
    name: "skills",
    label: "Kỹ năng",
    placeholder: "Chọn kỹ năng",
    type: "select",
    mode: "multiple",
    options: (this.props.cubeSkills || []).map((skill) => ({
      label: skill.name,
      value: skill._id,
    })),
    rules: [{ required: true, message: "Vui lòng chọn ít nhất một kỹ năng!" }],
  },
    
  ];

  handleAdd = (values) => {
  const payload = {
    ...values,
    skills: values.skills, // Đảm bảo gửi danh sách ID kỹ năng
  };
  this.props.addCubeSubject(payload);
};

 handleUpdate = (values) => {
  const payload = {
    ...values,
    skills: values.skills, // Đảm bảo gửi danh sách ID kỹ năng
  };
  this.props.updateCubeSubject(payload);
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
  return {
    cubeSkills: state.cubeSkillReducer?.cubeSkillList || [], // Lấy danh sách Cube Skill
    cubeSubjects: state.cubeSubjectReducer?.cubeSubjectList || [],
    gettingCubeSubjectList: state.cubeSubjectReducer?.gettingCubeSubjectList || false,
    getCubeSubjectListSuccess: state.cubeSubjectReducer?.getCubeSubjectListSuccess || false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCubeSubjectList: () => dispatch(fetchCubeSubjectList()),
    fetchCubeSkillList: () => dispatch(fetchCubeSkillList()), // Thêm dòng này
    updateCubeSubjectStatus: (key, status) =>
      dispatch(updateCubeSubjectStatus(key, status)),
    addCubeSubject: (values) => dispatch(addCubeSubject(values)),
    updateCubeSubject: (values) => dispatch(updateCubeSubject(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CubeSubjectManagement);