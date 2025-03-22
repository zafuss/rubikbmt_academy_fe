import { useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import { UserOutlined, LockOutlined, UploadOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import styles from "../styles/Profile.module.scss";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Nguyen Van A",
    email: "user@example.com",
    role: "Admin",
    phone: "0123 456 789",
    avatar: null,
  });
  const [form] = Form.useForm();

  const handleChangePassword = (values) => {
    console.log("Change password:", values);
    message.success("Đổi mật khẩu thành công!");
    form.resetFields();
  };

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      message.success("Tải ảnh lên thành công!");
      setUserInfo({
        ...userInfo,
        avatar: URL.createObjectURL(info.file.originFileObj),
      });
    } else if (info.file.status === "error") {
      message.error("Tải ảnh thất bại!");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.headerSection}>
          <h1 className={styles.title}>Thông tin cá nhân</h1>
          <p className={styles.subtitle}>
            Quản lý thông tin và cài đặt tài khoản của bạn.
          </p>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="Thông tin cơ bản" className={styles.card}>
              <div className={styles.avatarSection}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar
                    size={100}
                    icon={<UserOutlined />}
                    src={userInfo.avatar}
                    className={styles.avatar}
                  />
                </motion.div>
                <div className={styles.uploadButton}>
                  <Upload
                    showUploadList={false}
                    customRequest={({ file, onSuccess }) => {
                      setTimeout(() => onSuccess("ok"), 1000);
                    }}
                    onChange={handleUpload}
                  >
                    <Button icon={<UploadOutlined />}>Đổi ảnh đại diện</Button>
                  </Upload>
                </div>
              </div>
              <div className={styles.userInfo}>
                <h3 className={styles.userName}>{userInfo.name}</h3>
                <p className={styles.userRole}>{userInfo.role}</p>
              </div>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <div>
                    <span className={styles.infoLabel}>Họ tên: </span>
                    <span className={styles.infoValue}>{userInfo.name}</span>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div>
                    <span className={styles.infoLabel}>Email: </span>
                    <span className={styles.infoValue}>{userInfo.email}</span>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div>
                    <span className={styles.infoLabel}>Số điện thoại: </span>
                    <span className={styles.infoValue}>{userInfo.phone}</span>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div>
                    <span className={styles.infoLabel}>Vai trò: </span>
                    <span className={styles.infoValue}>{userInfo.role}</span>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} md={12}>
            <Card title="Đổi mật khẩu" className={styles.card}>
              <Form
                form={form}
                onFinish={handleChangePassword}
                layout="vertical"
              >
                <Form.Item
                  name="currentPassword"
                  label={
                    <span className={styles.infoLabel}>Mật khẩu hiện tại</span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu hiện tại!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Mật khẩu hiện tại"
                    size="large"
                    className={styles.input}
                  />
                </Form.Item>
                <Form.Item
                  name="newPassword"
                  label={<span className={styles.infoLabel}>Mật khẩu mới</span>}
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Mật khẩu mới"
                    size="large"
                    className={styles.input}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label={
                    <span className={styles.infoLabel}>Xác nhận mật khẩu</span>
                  }
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng xác nhận mật khẩu mới!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
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
                    className={styles.input}
                  />
                </Form.Item>
                <Form.Item>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={styles.submitButton}
                    >
                      Cập nhật mật khẩu
                    </Button>
                  </motion.div>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default Profile;
