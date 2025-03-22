import { Form, Input, Button, Card } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import colors from "../constants/colors";
// Reusing styled components từ Login
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

const Register = () => {
  const onFinish = (values) => {
    console.log("Register:", values);
    // Thêm logic đăng ký tại đây
  };

  return (
    <Container>
      {/* Phần bên trái với ảnh nền và text */}
      <LeftSection>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center" }}
        >
          <GradientText>Create Account</GradientText>
          <p style={{ fontSize: "18px", color: "#d3e0ff" }}>
            Sign up to experience Horizon UI.
          </p>
        </motion.div>
      </LeftSection>

      {/* Phần bên phải với form đăng ký */}
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
              Đăng ký
            </h2>
            <Form name="register" onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Vui lòng nhập tài khoản!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Tài khoản"
                  size="large"
                  style={{ borderRadius: 8 }}
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
                  placeholder="Email"
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Mật khẩu"
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu xác nhận không khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Xác nhận mật khẩu"
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>
              <Form.Item>
                <StyledButton type="primary" htmlType="submit">
                  Đăng ký
                </StyledButton>
              </Form.Item>
              <div style={{ textAlign: "center" }}>
                <span>Đã có tài khoản? </span>
                <Link to="/login" style={{ color: colors.primary }}>
                  Đăng nhập ngay
                </Link>
              </div>
            </Form>
          </StyledCard>
        </motion.div>
      </RightSection>
    </Container>
  );
};

export default Register;
