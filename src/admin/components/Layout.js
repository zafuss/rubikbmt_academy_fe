// src/admin/components/MainLayout.jsx
import React, { Component } from "react";
import { Layout as AntLayout, Dropdown, message } from "antd";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import UserInfoCard from "./UserInfoCard";
import HeaderSection from "./HeaderSection";
import SidebarMenu from "./SidebarMenu";
import "../styles/admin.css";
import withNavigate from "src/store/HOC/withNavigate";
import { connect } from "react-redux";
import {
  logoutUser,
  resetLogoutState,
} from "src/store/actions/user/userActions";

const { Content } = AntLayout;

class MainLayout extends Component {
  constructor(props) {
    super(props);
    console.log("Constructor - props.userInfo:", props.userInfo);
    this.state = {
      userInfo: props.userInfo
        ? {
            name:
              `${props.userInfo.firstName || ""} ${
                props.userInfo.lastName || ""
              }`.trim() || "Người dùng",
            avatar: props.userInfo.avatar || null,
            roles: props.roles || ["Admin"],
            currentRole: props.roles?.[0] || "Admin",
          }
        : null,
      collapsed: false,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate triggered");
    console.log("prevProps.userInfo:", prevProps.userInfo);
    console.log("this.props.userInfo:", this.props.userInfo);

    if (this.props.userInfo === undefined) {
      console.log("userInfo undefined, navigating to /login");
      this.props.navigate("/login");
      return;
    }

    if (this.props.logoutUserSuccess && !prevProps.logoutUserSuccess) {
      message.success("Đăng xuất thành công");
      this.setState({ userInfo: null }); // Reset state.userInfo sau logout
      return;
    }

    if (this.props.logoutUserFailureMsg && !prevProps.logoutUserFailureMsg) {
      message.error(this.props.logoutUserFailureMsg);
      this.props.resetLogoutState();
    }

    if (prevProps.userInfo !== this.props.userInfo) {
      console.log("Updating state.userInfo with:", this.props.userInfo);
      this.setState({
        userInfo: this.props.userInfo
          ? {
              name:
                `${this.props.userInfo.firstName || ""} ${
                  this.props.userInfo.lastName || ""
                }`.trim() || "Người dùng",
              avatar: this.props.userInfo.avatar || null,
              roles: this.props.roles || ["Admin"],
              currentRole: this.props.roles?.[0] || "Admin",
            }
          : null,
      });
    }
  }

  handleResize = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      this.setState({ collapsed: true });
    } else {
      this.setState({ collapsed: false });
    }
  };

  toggleCollapse = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  handleRoleChange = (role) => {
    this.setState((prevState) => ({
      userInfo: {
        ...prevState.userInfo,
        currentRole: role,
      },
    }));
  };

  render() {
    const { userInfo, collapsed } = this.state;
    console.log("MainLayout render - state.userInfo:", userInfo);

    if (!userInfo) {
      console.log("MainLayout: userInfo is null, returning null");
      return null;
    }

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

    return (
      <AntLayout style={{ minHeight: "100vh" }}>
        <SidebarMenu
          menuItems={menuItems}
          collapsed={collapsed}
          onCollapse={this.toggleCollapse}
        >
          <Dropdown menu={{ items: roleMenuItems }} trigger={["click"]}>
            <UserInfoCard
              userInfo={userInfo}
              roleMenuItems={roleMenuItems}
              collapsed={collapsed}
            />
          </Dropdown>
        </SidebarMenu>
        <AntLayout>
          <HeaderSection
            userInfo={userInfo}
            userMenu={userMenu}
            collapsed={collapsed}
            toggleCollapse={this.toggleCollapse}
          />
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
    logoutUser: () => dispatch(logoutUser()),
    resetLogoutState: () => dispatch(resetLogoutState()),
  };
};

export default withNavigate(
  connect(mapStateToProps, mapDispatchToProps)(MainLayout)
);
