import React, { Component } from "react";
import { Layout as AntLayout, Dropdown, message, Spin } from "antd";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import UserInfoCard from "./UserInfoCard";
import HeaderSection from "./HeaderSection";
import SidebarMenu from "./SidebarMenu";
import "../styles/admin.css";
import withNavigate from "src/store/HOC/withNavigate";
import { connect } from "react-redux";
import {
  fetchUser,
  logoutUser,
  resetLogoutState,
} from "src/store/actions/user/userActions";

const { Content } = AntLayout;

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "Nguyen Van A",
        avatar: null,
        roles: ["Admin", "Giáo viên"],
        currentRole: "Admin",
      },
    };
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  componentDidUpdate(prevProps) {
    // Redirect to login if userInfo is null (e.g., not authenticated)
    // console.log(this.props.userInfo);
    if (this.props.userInfo === undefined) {
      this.props.navigate("/login");
      return; // Exit early to avoid further processing
    }

    if (this.props.logoutUserSuccess) {
      message.success("Đăng xuất thành công");
      this.props.navigate("/login");
      this.props.resetLogoutState();
      return; // Exit early to avoid further processing
    }

    if (this.props.logoutUserFailureMsg) {
      message.error(this.props.logoutUserFailureMsg);
      this.props.resetLogoutState();
    }

    // Update state only if userInfo exists and has changed
    if (this.props.userInfo && prevProps.userInfo !== this.props.userInfo) {
      this.setState({
        userInfo: {
          name: `${this.props.userInfo.firstName || ""} ${
            this.props.userInfo.lastName || ""
          }`,
          avatar: this.props.userInfo.avatar || null,
          roles: this.props.roles || ["Admin"], // Fallback to default role if roles are empty
          currentRole: this.props.roles?.[0] || "Admin",
        },
      });
    }
  }

  handleRoleChange = (role) => {
    this.setState((prevState) => ({
      userInfo: {
        ...prevState.userInfo,
        currentRole: role,
      },
    }));
  };

  render() {
    const { userInfo } = this.state;
    const { navigate, loading } = this.props;

    const roleMenuItems = userInfo.roles.map((role) => ({
      key: role,
      label: role,
      onClick: () => this.handleRoleChange(role),
    }));

    const userMenu = {
      items: [
        { key: "1", label: <Link to="/admin/profile">Thông tin cá nhân</Link> },
        {
          key: "2",
          label: "Đăng xuất",
          onClick: () => this.props.logoutUser(),
        },
      ],
    };

    const menuItems = [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: <Link to="/admin">Dashboard</Link>,
      },
      ...(userInfo.currentRole === "admin"
        ? [
            {
              key: "2",
              icon: <UserOutlined />,
              label: <Link to="/admin/users">Quản lý người dùng</Link>,
            },
          ]
        : []),
      {
        key: "3",
        icon: <UserOutlined />,
        label: "Quản lý Academy",
        children: [
          ...(userInfo.currentRole === "admin"
            ? [
                {
                  key: "4",
                  label: <Link to="/admin/classes/list">Quản lý lớp học</Link>,
                },
                {
                  key: "5",
                  label: <Link to="/admin/mentors">Quản lý giáo viên</Link>,
                },
                {
                  key: "6",
                  label: <Link to="/admin/students">Quản lý học viên</Link>,
                },
                {
                  key: "7",
                  label: "Quản lý khoá học",
                  children: [
                    {
                      key: "8",
                      label: <Link to="/admin/courses">Quản lý khoá học</Link>,
                    },
                    {
                      key: "9",
                      label: <Link to="/admin/subjects">Quản lý bộ môn</Link>,
                    },
                    {
                      key: "10",
                      label: (
                        <Link to="/admin/classes/list">Quản lý độ khó</Link>
                      ),
                    },
                    {
                      key: "11",
                      label: (
                        <Link to="/admin/classes/list">
                          Quản lý đánh giá trình độ
                        </Link>
                      ),
                    },
                  ],
                },
              ]
            : []),
        ],
      },
    ];

    // Show loading spinner while fetching user data
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#f0f2f5",
          }}
        >
          <Spin size="large" tip="Đang tải dữ liệu..." />
        </div>
      );
    }

    // Render the layout if userInfo is available
    return (
      <AntLayout style={{ minHeight: "100vh" }}>
        <SidebarMenu menuItems={menuItems}>
          <Dropdown menu={{ items: roleMenuItems }} trigger={["click"]}>
            <UserInfoCard userInfo={userInfo} roleMenuItems={roleMenuItems} />
          </Dropdown>
        </SidebarMenu>
        <AntLayout>
          <HeaderSection userInfo={userInfo} userMenu={userMenu} />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#f0f2f5",
            }}
          >
            <Outlet />
          </Content>
        </AntLayout>
      </AntLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.userReducer.loading,
    userInfo: state.userReducer.user,
    roles: state.userReducer.roles,
    logoutUserFailureMsg: state.userReducer.logoutUserFailureMsg,
    logoutUserSuccess: state.userReducer.logoutUserSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    logoutUser: () => dispatch(logoutUser()),
    resetLogoutState: () => dispatch(resetLogoutState()),
  };
};

export default withNavigate(
  connect(mapStateToProps, mapDispatchToProps)(MainLayout)
);
