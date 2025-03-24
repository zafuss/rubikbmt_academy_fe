import { useState } from "react"; // Removed unused Children import
import { Layout as AntLayout, Dropdown } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  ProfileOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserInfoCard from "./UserInfoCard";
import HeaderSection from "./HeaderSection";
import SidebarMenu from "./SidebarMenu";
import "../styles/admin.css";

const { Content } = AntLayout;

const MainLayout = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "Nguyen Van A",
    avatar: null,
    roles: ["Admin", "Giáo viên"],
    currentRole: "Admin",
  });

  const roleMenuItems = userInfo.roles.map((role) => ({
    key: role,
    label: role,
    onClick: () => setUserInfo({ ...userInfo, currentRole: role }),
  }));

  const userMenu = {
    items: [
      { key: "1", label: <Link to="/admin/profile">Thông tin cá nhân</Link> },
      { key: "2", label: "Đăng xuất", onClick: () => navigate("/login") },
    ],
  };

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
      key: "3",
      icon: <UserOutlined />,
      label: "Quản lý Academy",
      children: [
        ...(userInfo.currentRole === "Admin"
          ? [
              {
                key: "4",
                label: <Link to="/admin/classes/list">Quản lý lớp học</Link>,
              },
              {
                key: "5",
                label: <Link to="/admin/classes/list">Quản lý giáo viên</Link>,
              },
              {
                key: "6",
                label: <Link to="/admin/classes/list">Quản lý học viên</Link>,
              },
              {
                key: "7",
                label: "Quản lý khoá học",
                children: [
                  {
                    key: "8",
                    label: (
                      <Link to="/admin/classes/list">Quản lý khoá học</Link>
                    ),
                  },
                  {
                    key: "9",
                    label: <Link to="/admin/classes/list">Quản lý bộ môn</Link>,
                  },
                  {
                    key: "10",
                    label: <Link to="/admin/classes/list">Quản lý độ khó</Link>,
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
      <SidebarMenu menuItems={menuItems}>
        <Dropdown menu={{ items: roleMenuItems }} trigger={["click"]}>
          <UserInfoCard userInfo={userInfo} roleMenuItems={roleMenuItems} />
        </Dropdown>
      </SidebarMenu>
      <AntLayout>
        <HeaderSection userInfo={userInfo} userMenu={userMenu} />
        <Content
          style={{ margin: "24px 16px", padding: 24, background: "#f0f2f5" }}
        >
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default MainLayout;
