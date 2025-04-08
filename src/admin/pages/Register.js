import React, { Component } from "react";
import { Form, Input, Button, Card, Modal } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { motion } from "framer-motion";
import colors from "../constants/colors";
import "@ant-design/v5-patch-for-react-19";
import { connect } from "react-redux";
import {
  registerUser,
  resetRegisterStateAction,
} from "src/store/actions/user/userActions";
import { Alert } from "react-bootstrap";

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f0f2f5;
`;

const LeftSection = styled.div`
  flex: 1;
  background: linear-gradient(
    135deg,
    ${colors.primary} 0%,
    ${colors.primaryGradient} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 40px;
  position: relative;
  overflow: hidden;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #fff;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: none;
`;

const GradientText = styled.h1`
  font-size: 42px;
  font-weight: bold;
  background: linear-gradient(90deg, #ffffff, #d3e0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
  text-align: center;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(
    90deg,
    ${colors.primary},
    ${colors.primaryGradient}
  );
  border: none;
  border-radius: 8px;
  height: 40px;
  width: 100%;
  color: #fff;
  &:hover {
    background: linear-gradient(
      90deg,
      ${colors.primaryGradient},
      ${colors.primary}
    );
    color: #fff;
  }
`;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      email: "",
      firstName: "",
      lastName: "",
    };
  }

  componentWillUnmount() {
    this.props.resetRegisterState();
  }

  handleOnClickRegister = () => {
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      email: this.state.email,
    };
    this.props.registerUser(user);
  };

  render() {
    return (
      <Container>
        <LeftSection>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center" }}
          >
            <GradientText>Nhận tư vấn khoá học miễn phí</GradientText>
            <p style={{ fontSize: "18px", color: "#d3e0ff" }}>
              Vui lòng điền thông tin bên phải. Chúng tôi sẽ liên hệ với bạn để
              tư vấn khóa học Rubik phù hợp nhất tại RubikBMT Academy.
            </p>
          </motion.div>
        </LeftSection>

        <RightSection>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <StyledCard>
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: 24,
                  color: colors.primary,
                }}
              >
                Đăng ký tư vấn
              </h2>

              <Form name="register">
                {this.props.registerSuccess && (
                  <Modal
                    title="✅ Đăng ký thành công"
                    open={true}
                    footer={[
                      <Button
                        key="ok"
                        type="primary"
                        onClick={() => this.props.resetRegisterState()}
                      >
                        OK
                      </Button>,
                    ]}
                    onCancel={() => this.props.resetRegisterState()}
                  >
                    <p>
                      Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn trong
                      thời gian sớm nhất.
                    </p>
                  </Modal>
                )}

                {this.props.registerFailure && (
                  <Alert variant="danger">
                    <div>❌ Lỗi đăng ký: {this.props.registerFailure}</div>
                  </Alert>
                )}

                <Form.Item
                  name="firstName"
                  rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Nhập họ của bạn"
                    size="large"
                    style={{ borderRadius: 8 }}
                    value={this.state.firstName}
                    onChange={(event) =>
                      this.setState({ firstName: event.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Nhập tên của bạn"
                    size="large"
                    style={{ borderRadius: 8 }}
                    value={this.state.lastName}
                    onChange={(event) =>
                      this.setState({ lastName: event.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="Số điện thoại liên hệ"
                    size="large"
                    style={{ borderRadius: 8 }}
                    value={this.state.phone}
                    onChange={(event) =>
                      this.setState({ phone: event.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Vui lòng nhập email hợp lệ!",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Email để nhận thông tin"
                    size="large"
                    style={{ borderRadius: 8 }}
                    value={this.state.email}
                    onChange={(event) =>
                      this.setState({ email: event.target.value })
                    }
                  />
                </Form.Item>

                <Form.Item>
                  <StyledButton
                    onClick={this.handleOnClickRegister}
                    type="primary"
                    htmlType="submit"
                    disabled={this.props.loading}
                  >
                    {this.props.loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm"></span>{" "}
                        Đang gửi thông tin...
                      </>
                    ) : (
                      "Gửi thông tin tư vấn"
                    )}
                  </StyledButton>
                </Form.Item>
              </Form>
            </StyledCard>
          </motion.div>
        </RightSection>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.userReducer.loading,
    registerSuccess: state.userReducer.registerUserSuccess,
    registerFailure: state.userReducer.registerUserFailureMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (user) => dispatch(registerUser(user)),
    resetRegisterState: () => dispatch(resetRegisterStateAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
