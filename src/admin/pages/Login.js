import React, { Component } from "react";
import { Form, Input, Button, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, Navigate } from "react-router-dom";
import colors from "../constants/colors";
import { connect } from "react-redux";
import { loginUser } from "src/store/actions/user/userActions";
import { Alert } from "react-bootstrap";

// Styled components
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
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: none;
`;

const GradientText = styled.h1`
  font-size: 48px;
  font-weight: bold;
  background: linear-gradient(90deg, #ffffff, #d3e0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleOnLogin = () => {
    const { email, password } = this.state;
    this.props.loginUser({ email, password });
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
            <GradientText>Chào mừng trở lại!</GradientText>
            <p style={{ fontSize: "18px", color: "#d3e0ff" }}>
              Đăng nhập để tiếp tục quản lý hệ thống Rubik BMT Academy
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
                Đăng nhập
              </h2>
              <Form name="login">
                {this.props.loginSuccess && (
                  <Navigate to="/admin" replace={true}></Navigate>
                )}
                {this.props.loginFailure && (
                  <Alert variant="danger">
                    <div>
                      Lỗi đăng nhập tài khoản: {this.props.loginFailure}
                    </div>
                  </Alert>
                )}
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Vui lòng nhập tài khoản!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    placeholder="Tài khoản"
                    size="large"
                    style={{ borderRadius: 8 }}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    placeholder="Mật khẩu"
                    size="large"
                    style={{ borderRadius: 8 }}
                  />
                </Form.Item>
                <Form.Item>
                  <StyledButton
                    onClick={this.handleOnLogin}
                    type="primary"
                    htmlType="submit"
                    disabled={this.props.loading} // Vô hiệu hóa nút khi đang tải
                  >
                    {this.props.loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm"></span>{" "}
                        Đang đăng nhập...
                      </>
                    ) : (
                      "Đăng nhập"
                    )}
                  </StyledButton>
                </Form.Item>
                <div style={{ textAlign: "center" }}>
                  <span>Chưa có tài khoản? </span>
                  <Link to="/register" style={{ color: colors.primary }}>
                    Đăng ký ngay
                  </Link>
                </div>
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
    loginSuccess: state.userReducer.loginUserSuccess,
    loginFailure: state.userReducer.loginUserFailureMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
