import React, { Component } from "react";
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
  Spin,
} from "antd";
import { UserOutlined, LockOutlined, UploadOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import styles from "../styles/Profile.module.scss";
import { connect } from "react-redux";
import {
  changePassword,
  resetChangePasswordStatus,
} from "src/store/actions/user/userActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.userInfo) {
      this.setState({
        userInfo: {
          name: `${this.props.userInfo.firstName || ""} ${
            this.props.userInfo.lastName || ""
          }`,
          email: this.props.userInfo.email || "",
          roles: this.props.roles || ["Admin"],
          phone: this.props.userInfo.phone || "",
          avatar: this.props.userInfo.avatar || null,
        },
      });
    }
  }

  // Cập nhật state nếu props thay đổi (ví dụ: sau khi fetchUser hoàn tất hoặc dữ liệu thay đổi)
  componentDidUpdate(prevProps) {
    if (this.props.userInfo && prevProps.userInfo !== this.props.userInfo) {
      this.setState({
        userInfo: {
          name: `${this.props.userInfo.firstName || ""} ${
            this.props.userInfo.lastName || ""
          }`,
          email: this.props.userInfo.email || "",
          roles: this.props.roles || ["Admin"],
          phone: this.props.userInfo.phone || "",
          avatar: this.props.userInfo.avatar || null,
        },
      });
    }

    if (
      this.props.changePasswordSuccess &&
      prevProps.changePasswordSuccess !== this.props.changePasswordSuccess
    ) {
      message.success("Đổi mật khẩu thành công!");
      this.props.resetChangePasswordStatus();
      this.formRef.current.resetFields();
      this.setState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } else if (
      this.props.changePasswordFailureMsg &&
      prevProps.changePasswordFailureMsg !== this.props.changePasswordFailureMsg
    ) {
      message.error(this.props.changePasswordFailureMsg);
      this.props.resetChangePasswordStatus();
    }
  }

  handleChangePassword = (values) => {
    this.props.changePassword({
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
    });
  };

  handleUpload = (info) => {
    if (info.file.status === "done") {
      message.success("Tải ảnh lên thành công!");
      this.setState({
        userInfo: {
          ...this.state.userInfo,
          avatar: URL.createObjectURL(info.file.originFileObj),
        },
      });
    } else if (info.file.status === "error") {
      message.error("Tải ảnh thất bại!");
    }
  };

  render() {
    const { userInfo } = this.state;
    const { loading } = this.props;

    // Nếu đang tải dữ liệu, hiển thị Spin
    if (loading || !userInfo) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" tip="Đang tải dữ liệu..." />
        </div>
      );
    }

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
                      onChange={this.handleUpload}
                    >
                      <Button icon={<UploadOutlined />}>
                        Đổi ảnh đại diện
                      </Button>
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
                      <span className={styles.infoValue}>
                        {userInfo.roles.join(", ")}
                      </span>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card title="Đổi mật khẩu" className={styles.card}>
                <Form
                  ref={this.formRef}
                  onFinish={this.handleChangePassword}
                  layout="vertical"
                >
                  <Form.Item
                    name="currentPassword"
                    label={
                      <span className={styles.infoLabel}>
                        Mật khẩu hiện tại
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu hiện tại!",
                      },
                    ]}
                  >
                    <Input.Password
                      onChange={(e) =>
                        this.setState({ oldPassword: e.target.value })
                      }
                      prefix={<LockOutlined />}
                      placeholder="Mật khẩu hiện tại"
                      size="large"
                      className={styles.input}
                    />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label={
                      <span className={styles.infoLabel}>Mật khẩu mới</span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu mới!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Mật khẩu mới"
                      onChange={(e) =>
                        this.setState({ newPassword: e.target.value })
                      }
                      size="large"
                      className={styles.input}
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label={
                      <span className={styles.infoLabel}>
                        Xác nhận mật khẩu
                      </span>
                    }
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng xác nhận mật khẩu mới!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
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
                      onChange={(e) =>
                        this.setState({ confirmPassword: e.target.value })
                      }
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
                        {this.props.changingPassword ? (
                          <>
                            <span className="spinner-border spinner-border-sm"></span>{" "}
                            Đang thực hiện...
                          </>
                        ) : (
                          "Cập nhật mật khẩu"
                        )}
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
  }
}

const mapStateToProps = (state) => {
  return {
    changingPassword: state.userReducer.changingPassword,
    changePasswordSuccess: state.userReducer.changePasswordSuccess,
    changePasswordFailureMsg: state.userReducer.changePasswordFailureMsg,
    loading: state.userReducer.loading,
    userInfo: state.userReducer.user,
    roles: state.userReducer.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (data) => dispatch(changePassword(data)),
    resetChangePasswordStatus: () => dispatch(resetChangePasswordStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
