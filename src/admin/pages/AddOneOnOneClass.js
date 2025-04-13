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
import { addCourseDetail } from "src/store/actions/courseDetail/courseDetailActions";
import colors from "../constants/colors";
import moment from "moment";
import withNavigate from "../../store/HOC/withNavigate.js";

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

class AddOneOnOneClass extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      numOfSessions: 0,
      defaultSessions: [],
      minutesPerSession: 0, // Added to store course duration
    };
  }

  componentDidMount() {
    if (!this.props.courses.length) {
      this.props.fetchCourseList();
    }
    if (!this.props.students.length) {
      this.props.fetchStudentList();
    }
    if (!this.props.mentors.length) {
      this.props.fetchMentorList();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.courses !== this.props.courses ||
        prevProps.students !== this.props.students ||
        prevProps.mentors !== this.props.mentors) &&
      (this.props.courses.length > 0 ||
        this.props.students.length > 0 ||
        this.props.mentors.length > 0)
    ) {
      console.log("Updated courses, students or mentors data.");
      console.log("Courses:", this.props.courses);
    }

    if (
      this.props.addSuccess &&
      prevProps.addSuccess !== this.props.addSuccess
    ) {
      message.success("Thêm lớp học 1-1 thành công!");
      this.formRef.current.resetFields();
      this.setState({
        numOfSessions: 0,
        defaultSessions: [],
        minutesPerSession: 0,
      });
      this.props.navigate("/admin/classes/list");
    }

    if (this.props.error && prevProps.error !== this.props.error) {
      message.error(`Thêm lớp học 1-1 thất bại: ${this.props.error}`);
    }
  }

  handleCourseChange = (courseId) => {
    const selectedCourse = this.props.courses.find(
      (course) => course._id === courseId
    );
    if (selectedCourse) {
      const numOfSessions = selectedCourse.numOfSessions || 0;
      const minutesPerSession = selectedCourse.minutesPerSession || 0; // Assuming this exists in course data
      const defaultSessions = this.generateDefaultSessions(numOfSessions);

      console.log("Selected Course:", selectedCourse);
      console.log("Generated Default Sessions:", defaultSessions);
      console.log("Minutes Per Session:", minutesPerSession);

      this.setState(
        {
          numOfSessions,
          defaultSessions,
          minutesPerSession,
        },
        () => {
          this.formRef.current.setFieldsValue({
            actualFee: selectedCourse.fee || 0,
            sessions: defaultSessions,
          });
        }
      );
    }
  };

  generateDefaultSessions = (numOfSessions) => {
    const now = moment();
    const sessions = [];
    for (let i = 0; i < numOfSessions; i++) {
      sessions.push(now.clone().add(i * 7, "days"));
    }
    return sessions;
  };

  onFinish = (values) => {
    console.log("Form values:", values);
    const formattedSessions = values.sessions.map((session) => {
      const startTime = moment(session).utc().format("YYYY-MM-DDTHH:mm:ss[Z]"); // UTC ISO format
      const endTime = moment(session)
        .add(this.state.minutesPerSession, "minutes")
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss[Z]"); // Add minutesPerSession and format
      return { startTime, endTime };
    });

    const formattedValues = {
      ...values,
      sessions: formattedSessions,
    };

    console.log("Add one-on-one class:", formattedValues);
    this.props.addCourseDetail(formattedValues);
  };

  renderSessionPickers = () => {
    return (
      <Form.List name="sessions" initialValue={this.state.defaultSessions}>
        {(fields) => (
          <Row gutter={[16, 16]}>
            {this.state.numOfSessions > 0 &&
              Array.from({ length: this.state.numOfSessions }).map(
                (_, index) => (
                  <Col key={`session-${index}`} xs={24} sm={12} md={8} lg={6}>
                    <Form.Item
                      name={index}
                      label={
                        <span
                          style={{ fontWeight: 500, color: colors.primary }}
                        >
                          Buổi {index + 1}
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: `Vui lòng chọn thời gian cho buổi ${
                            index + 1
                          }!`,
                        },
                      ]}
                    >
                      <DatePicker
                        showTime
                        format="HH:mm DD/MM/YYYY"
                        placeholder={`Chọn thời gian buổi ${index + 1}`}
                        style={{ width: "100%", borderRadius: 8 }}
                      />
                    </Form.Item>
                  </Col>
                )
              )}
          </Row>
        )}
      </Form.List>
    );
  };

  render() {
    const { courses, students, mentors, loading } = this.props;

    console.log("Courses:", courses);
    console.log("Default Sessions:", this.state.defaultSessions);

    return (
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeaderSection>
            <Title>Thêm lớp học 1-1</Title>
            <Subtitle>Điền thông tin để tạo một lớp học 1-1 mới.</Subtitle>
          </HeaderSection>
          <StyledCard>
            <Form
              ref={this.formRef}
              onFinish={this.onFinish}
              layout="vertical"
              initialValues={{
                actualFee: 0,
                Paid: 0,
                numberOfStudied: 0,
              }}
            >
              <Form.Item
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
                  onChange={this.handleCourseChange}
                >
                  {Array.isArray(courses) &&
                    courses.map((course) => (
                      <Option key={course._id} value={course._id}>
                        {course.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="student"
                label={
                  <span style={{ fontWeight: 500, color: colors.primary }}>
                    Học viên
                  </span>
                }
                rules={[{ required: true, message: "Vui lòng chọn học viên!" }]}
              >
                <Select
                  placeholder="Chọn học viên"
                  size="large"
                  style={{ borderRadius: 8 }}
                  loading={loading}
                >
                  {Array.isArray(students) &&
                    students.map((student) => (
                      <Option key={student._id} value={student._id}>
                        {`${student.firstName} ${student.lastName} - ${student.email} - ${student.phone}`}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="teacher"
                label={
                  <span style={{ fontWeight: 500, color: colors.primary }}>
                    Giáo viên phụ trách
                  </span>
                }
                rules={[
                  { required: true, message: "Vui lòng chọn giáo viên!" },
                ]}
              >
                <Select
                  placeholder="Chọn giáo viên"
                  size="large"
                  style={{ borderRadius: 8 }}
                  loading={loading}
                >
                  {Array.isArray(mentors) &&
                    mentors.map((teacher) => (
                      <Option key={teacher._id} value={teacher._id}>
                        {`${teacher.firstName} ${teacher.lastName} - ${teacher.email} - ${teacher.phone}`}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="actualFee"
                label={
                  <span style={{ fontWeight: 500, color: colors.primary }}>
                    Học phí thực tế (VND)
                  </span>
                }
                rules={[
                  { required: true, message: "Vui lòng nhập học phí thực tế!" },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Học phí thực tế"
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item
                name="Paid"
                label={
                  <span style={{ fontWeight: 500, color: colors.primary }}>
                    Đã thanh toán (VND)
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số tiền đã thanh toán!",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Nhập số tiền đã thanh toán"
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              {this.renderSessionPickers()}

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
                    {this.props.loading ? "Đang thêm..." : "Thêm lớp học 1-1"}
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
    loading:
      state.courseDetailReducer.loading ||
      state.courseReducer.gettingCourseList ||
      state.userReducer.loading ||
      false,
    error: state.courseDetailReducer.error || null,
    fetchSuccess: state.courseReducer.fetchSuccess || false,
    addSuccess: state.courseDetailReducer.addSuccess || false,
    updateSuccess: state.courseDetailReducer.updateSuccess || false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourseList: () => dispatch(fetchCourseList()),
    fetchStudentList: () => dispatch(fetchStudentList()),
    fetchMentorList: () => dispatch(fetchMentorList()),
    addCourseDetail: (courseDetail) => dispatch(addCourseDetail(courseDetail)),
  };
};

export default withNavigate(
  connect(mapStateToProps, mapDispatchToProps)(AddOneOnOneClass)
);
