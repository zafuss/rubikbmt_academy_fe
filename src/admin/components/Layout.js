import { useState } from "react";
import { Layout as AntLayout, Menu, Dropdown, Avatar } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  ProfileOutlined,
  BookOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "../styles/admin.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import colors from "../constants/colors";

const { Header, Sider, Content } = AntLayout;

const StyledSider = styled(Sider)`
  background: ${colors.primary};
  .ant-menu {
    background: transparent;
    color: #fff;
    border: none;
  }
  .ant-menu-item,
  .ant-menu-submenu-title {
    transition: all 0.3s ease;
    &:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      transform: translateX(5px);
    }
  }
  .ant-menu-item-selected,
  .ant-menu-submenu-selected .ant-menu-submenu-title {
    background: rgba(255, 255, 255, 0.2) !important;
    color: #fff !important;
  }
  .ant-menu-submenu .ant-menu-sub {
    background: rgba(255, 255, 255, 0.05) !important;
  }
  .ant-menu-submenu .ant-menu-item {
    background: transparent !important;
    color: #d3e0ff !important;
    &:hover {
      background: rgba(255, 255, 255, 0.3) !important;
      color: #fff !important;
    }
  }
`;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const StyledAvatar = styled(Avatar)`
  background: linear-gradient(
    135deg,
    ${colors.primary} 0%,
    ${colors.primaryGradient} 100%
  );
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserInfoCard = styled.div`
  margin: 16px 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.02);
  }
`;

const UserInfoText = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

const UserRole = styled.div`
  font-size: 14px;
  color: #d3e0ff;
`;

const Layout = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "Nguyen Van A",
    avatar: null,
    roles: ["Admin", "Giáo viên"],
    currentRole: "Admin",
  });

  // Định nghĩa menu cho Dropdown (thay overlay bằng menu)
  const roleMenu = {
    items: userInfo.roles.map((role) => ({
      key: role,
      label: role,
      onClick: () => setUserInfo({ ...userInfo, currentRole: role }),
    })),
  };

  const userMenu = {
    items: [
      {
        key: "1",
        label: <Link to="/admin/profile">Thông tin cá nhân</Link>,
      },
      {
        key: "2",
        label: "Đăng xuất",
        onClick: () => navigate("/login"),
      },
    ],
  };

  // Định nghĩa items cho Menu (thay children bằng items)
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    ...(userInfo.currentRole === "Admin"
      ? [
          {
            key: "2",
            icon: <UserOutlined />,
            label: <Link to="/admin/users">Quản lý người dùng</Link>,
          },
        ]
      : []),
    {
      key: "sub1",
      icon: <BookOutlined />,
      label: "Quản lý lớp học",
      children: [
        {
          key: "sub2",
          label: "Thêm lớp học",
          children: [
            {
              key: "3",
              label: (
                <Link to="/admin/classes/add/mass">Thêm lớp học đại trà</Link>
              ),
            },
            {
              key: "4",
              label: (
                <Link to="/admin/classes/add/one-on-one">Thêm lớp học 1-1</Link>
              ),
            },
          ],
        },
        {
          key: "5",
          label: <Link to="/admin/classes/list">Danh sách lớp học</Link>,
        },
      ],
    },
    {
      key: "6",
      icon: <ProfileOutlined />,
      label: <Link to="/admin/profile">Thông tin cá nhân</Link>,
    },
  ];

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <StyledSider width={250}>
        <Dropdown menu={roleMenu} trigger={["click"]}>
          <UserInfoCard>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <StyledAvatar
                size={48}
                icon={<UserOutlined />}
                src={userInfo.avatar}
              />
            </motion.div>
            <UserInfoText>
              <UserName>{userInfo.name}</UserName>
              <UserRole>{userInfo.currentRole}</UserRole>
            </UserInfoText>
            <DownOutlined style={{ color: "#d3e0ff", fontSize: 12 }} />
          </UserInfoCard>
        </Dropdown>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </StyledSider>
      <AntLayout>
        <StyledHeader>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ margin: 0, color: colors.primary }}
          >
            RubikBMT Academy
          </motion.h2>
          <UserSection>
            <span style={{ marginRight: 8, color: colors.primary }}>
              Welcome, {userInfo.name}
            </span>
            <Dropdown menu={userMenu} trigger={["click"]}>
              <StyledAvatar
                size={40}
                icon={<UserOutlined />}
                src={userInfo.avatar}
              >
                <DownOutlined style={{ fontSize: 12, marginLeft: 4 }} />
              </StyledAvatar>
            </Dropdown>
          </UserSection>
        </StyledHeader>
        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#f0f2f5" }}
        >
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
