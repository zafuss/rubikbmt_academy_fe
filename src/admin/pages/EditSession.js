import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  DatePicker,
  Select,
  Row,
  Col,
  message,
} from "antd";
import styled from "styled-components";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { fetchCourseList } from "src/store/actions/course/courseActions.js";
import {
  fetchStudentList,
  fetchMentorList,
} from "src/store/actions/user/userActions.js";
import {
  fetchSession,
  updateSession,
} from "src/store/actions/session/sessionActions.js";
import colors from "../constants/colors";
import moment from "moment";
import { withRouter } from "../../store/HOC/withRouter"; // Thêm withRouter
import { compose } from "redux";
import withNavigate from "src/store/HOC/withNavigate";

const { Option } = Select;

const PageContainer = styled.div`
  padding: 24px;
  background: #f0f2f5;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.primary};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 8px 0 0;
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #fff;
  border: none;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, ${colors.primary}, #2a5298);
  border: none;
  border-radius: 8px;
  height: 40px;
  width: 100%;
  color: #fff;
  font-weight: 500;
  &:hover {
    background: linear-gradient(
      90deg,
      ${colors.primaryGradient},
      ${colors.primary}
    );
    color: #fff;
  }
`;

class EditSession extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      sessionId: null,
      sessionData: null,
    };
  }

  componentDidMount() {
    const sessionId = this.props.params.id; // Lấy sessionId từ params
    console.log("Session ID:", sessionId);
    this.setState({ sessionId });

    // Gọi các danh sách cần thiết nếu chưa có
    if (!this.props.courses.length) {
      this.props.fetchCourseList();
    }
    if (!this.props.students.length) {
      this.props.fetchStudentList();
    }
    if (!this.props.mentors.length) {
      this.props.fetchMentorList();
    }

    // Tải chi tiết session
    if (sessionId) {
      console.log("Fetching session detail for ID:", sessionId);
      this.props.fetchSessionDetail(sessionId);
    }
  }

  componentDidUpdate(prevProps) {
    const { navigate } = this.props;
    // Khi dữ liệu session được tải thành công
    console.log("Component updated:", this.props.currentSession);
    if (
      this.props.currentSession &&
      prevProps.currentSession !== this.props.currentSession
    ) {
      const sessionData = this.props.currentSession;
      this.setState({ sessionData }, () => {
        this.formRef.current.setFieldsValue({
          course: sessionData.idCourseDetail,
          student: sessionData.studentId,
          teacher: sessionData.mentorId,
          startTime: moment(sessionData.startTime),
          endTime: moment(sessionData.endTime),
          content: sessionData.content,
          ao5: sessionData.ao5,
        });
      });
    }

    // Khi cập nhật thành công
    if (
      this.props.updateSuccess &&
      prevProps.updateSuccess !== this.props.updateSuccess
    ) {
      message.success("Cập nhật buổi học thành công!");
      navigate("/admin/session/" + this.props.currentSession.idCourseDetail);
    }

    // Khi có lỗi
    if (this.props.error && prevProps.error !== this.props.error) {
      message.error(`Cập nhật buổi học thất bại: ${this.props.error}`);
    }
  }

  onFinish = (values) => {
    const formattedValues = {
      ...values,
      startTime: moment(values.startTime)
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss[Z]"),
      endTime: moment(values.endTime).utc().format("YYYY-MM-DDTHH:mm:ss[Z]"),
      _id: this.state.sessionId,
    };

    console.log("Update session:", formattedValues);
    this.props.updateSession(formattedValues);
  };

  render() {
    const { courses, students, mentors, loading } = this.props;

    return (
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeaderSection>
            <Title>Chỉnh sửa buổi học</Title>
            <Subtitle>Cập nhật thông tin chi tiết của buổi học.</Subtitle>
          </HeaderSection>
          <StyledCard>
            <Form ref={this.formRef} onFinish={this.onFinish} layout="vertical">
              {/* <Form.Item
                name="course"
                label={
                  <span style={{ fontWeight: 500, color: colors.primary }}>
                    Khóa học
                  </span>
                }
                rules={[{ required: true, message: "Vui lòng chọn khóa học!" }]}
              >
                <Select
                  placeholder="Chọn khóa học"
                  size="large"
                  style={{ borderRadius: 8 }}
                  loading={loading}
                >
                  {Array.isArray(courses) &&
                    courses.map((course) => (
                      <Option key={course._id} value={course._id}>
                        {course.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item> */}

              <Form.Item
                name="startTime"
                label={
                  <span style={{ fontWeight: 500, color: colors.primary }}>
                    Thời gian bắt đầu
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian bắt đầu!",
                  },
                ]}
              >
                <DatePicker
                  showTime
                  format="HH:mm DD/MM/YYYY"
                  placeholder="Chọn thời gian bắt đầu"
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item
                name="endTime"
                label={
                  <span style={{ fontWeight: 500, color: colors.primary }}>
                    Thời gian kết thúc
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian kết thúc!",
                  },
                ]}
              >
                <DatePicker
                  showTime
                  format="HH:mm DD/MM/YYYY"
                  placeholder="Chọn thời gian kết thúc"
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item
                name="content"
                label={
                  <span style={{ fontWeight: 500, color: colors.primary }}>
                    Nội dung buổi học
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập nội dung buổi học!",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập nội dung buổi học"
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item
                name="ao5"
                label={
                  <span style={{ fontWeight: 500, color: colors.primary }}>
                    Kết quả ao5
                  </span>
                }
              >
                <Input
                  placeholder="Nhập kết quả ao5 (nếu có)"
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <StyledButton
                    type="primary"
                    htmlType="submit"
                    loading={this.props.loading}
                  >
                    {this.props.loading
                      ? "Đang cập nhật..."
                      : "Cập nhật buổi học"}
                  </StyledButton>
                </motion.div>
              </Form.Item>
            </Form>
          </StyledCard>
        </motion.div>
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.courseReducer.courseList || [],
    students: state.userReducer.students || [],
    mentors: state.userReducer.mentors || [],
    currentSession: state.sessionReducer.currentSession || null,
    loading:
      state.sessionReducer.loading ||
      state.courseReducer.gettingCourseList ||
      state.userReducer.loading ||
      false,
    error: state.sessionReducer.error || null,
    updateSuccess: state.sessionReducer.updateSessionSuccess || false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourseList: () => dispatch(fetchCourseList()),
    fetchStudentList: () => dispatch(fetchStudentList()),
    fetchMentorList: () => dispatch(fetchMentorList()),
    fetchSessionDetail: (sessionId) => dispatch(fetchSession(sessionId)),
    updateSession: (sessionData) => dispatch(updateSession(sessionData)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(withNavigate(EditSession));
