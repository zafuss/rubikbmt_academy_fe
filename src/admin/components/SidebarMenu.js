import { Layout, Menu } from "antd";
import styled from "styled-components";
import colors from "../constants/colors";
import React from "react";

const { Sider } = Layout;

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

const SidebarMenu = ({ menuItems, children, collapsed, onCollapse }) => (
  <StyledSider
    width={250}
    collapsible
    collapsed={collapsed}
    onCollapse={onCollapse}
    breakpoint="lg"
    collapsedWidth={80}
    trigger={null}
  >
    {React.cloneElement(children, { collapsed })}{" "}
    {/* Pass collapsed to children */}
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={menuItems}
    />
  </StyledSider>
);
export default SidebarMenu;
