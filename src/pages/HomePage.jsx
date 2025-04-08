import React, { Component } from "react";
import NavBar from "../components/Shared/NavBar";
import Footer from "../components/Shared/Footer";
import IntroSection from "../components/HomePage/Sections/IntroSection";
import MentorsSection from "../components/HomePage/Sections/MentorsSection";
import AboutSection from "../components/HomePage/Sections/AboutSection";
import ShopeeSection from "../components/HomePage/Sections/ShopeeSection";
import SocialMediaSection from "../components/HomePage/Sections/SocialMediaSection";

import { Button, Modal, Form, Input } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  registerUser,
  resetRegisterStateAction,
} from "../store/actions/user/userActions";

class HomePage extends Component {
  state = {
    openModal: false,
    thankYouModalVisible: false,
    formData: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    prevRegisterUserSuccess: false,
  };

  componentDidUpdate(prevProps) {
    // Nếu trạng thái đăng ký thay đổi từ false → true
    if (!prevProps.registerUserSuccess && this.props.registerUserSuccess) {
      this.setState({
        openModal: false,
        thankYouModalVisible: true,
        formData: {
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
        },
      });
      this.props.resetRegisterStateAction();
    }
  }

  handleOpenModal = () => {
    this.setState({ openModal: true });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
    this.props.resetRegisterStateAction();
  };

  handleThankYouClose = () => {
    this.setState({ thankYouModalVisible: false });
  };

  handleChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleRegister = () => {
    this.props.registerUser(this.state.formData);
  };

  render() {
    const { openModal, formData, thankYouModalVisible } = this.state;
    const { registerUserFailureMsg, loading } = this.props;

    return (
      <div>
        <NavBar />
        <IntroSection />
        <MentorsSection />
        <SocialMediaSection />
        <AboutSection />
        <ShopeeSection />
        <Footer />

        {/* Nút nổi */}
        <Button
          type="primary"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 1000,
            background: "linear-gradient(90deg, #0f62fe, #7bb5ff)",
            border: "none",
            borderRadius: "30px",
            padding: "0 20px",
            height: "48px",
            fontWeight: "bold",
          }}
          onClick={this.handleOpenModal}
        >
          Đăng ký tư vấn
        </Button>

        {/* Modal đăng ký */}
        <Modal
          title="Đăng ký tư vấn khoá học"
          open={openModal}
          onCancel={this.handleCloseModal}
          footer={null}
        >
          {registerUserFailureMsg && (
            <p style={{ color: "red" }}>❌ {registerUserFailureMsg}</p>
          )}

          <Form layout="vertical">
            <Form.Item label="Họ" required>
              <Input
                prefix={<UserOutlined />}
                placeholder="Nhập họ"
                name="firstName"
                value={formData.firstName}
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item label="Tên" required>
              <Input
                prefix={<UserOutlined />}
                placeholder="Nhập tên"
                name="lastName"
                value={formData.lastName}
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item label="Số điện thoại" required>
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={this.handleChange}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                onClick={this.handleRegister}
                block
                disabled={loading}
              >
                {loading ? "Đang gửi..." : "Gửi thông tin tư vấn"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal cảm ơn */}
        <Modal
          open={thankYouModalVisible}
          onCancel={this.handleThankYouClose}
          footer={[
            <Button
              key="close"
              type="primary"
              onClick={this.handleThankYouClose}
            >
              Đóng
            </Button>,
          ]}
        >
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>
            ✅ Cảm ơn bạn đã đăng ký!
          </p>
          <p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
        </Modal>
      </div>
    );
  }
}

// Kết nối Redux
const mapStateToProps = (state) => ({
  registerUserSuccess: state.userReducer.registerUserSuccess,
  registerUserFailureMsg: state.userReducer.registerUserFailureMsg,
  loading: state.userReducer.loading,
});

const mapDispatchToProps = {
  registerUser,
  resetRegisterStateAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
