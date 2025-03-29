import { Layout, Button } from "antd";
import { Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  DownOutlined,
  LeftCircleOutlined, // Prettier collapse icon
  RightCircleOutlined, // Prettier expand icon
} from "@ant-design/icons";
import { motion } from "framer-motion";
import colors from "../constants/colors";
import styled from "styled-components";

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    .welcome-text {
      display: none;
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  background: linear-gradient(
    135deg,
    ${colors.primary} 0%,
    ${colors.primaryGradient} 100%
  );

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

const Title = styled(motion.h2)`
  margin: 0;
  color: ${colors.primary};

  @media (max-width: 576px) {
    display: none;
  }
`;

const ToggleButton = styled(motion(Button))`
  font-size: 20px; /* Slightly larger for prominence */
  color: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%; /* Circular button */
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    color: ${colors.primaryGradient};
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const HeaderSection = ({ userInfo, userMenu, collapsed, toggleCollapse }) => (
  <StyledHeader>
    <LeftSection>
      <ToggleButton
        type="text"
        icon={collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />}
        onClick={toggleCollapse}
        whileHover={{ scale: 1.1 }} // Subtle hover animation
        whileTap={{ scale: 0.95 }} // Tap feedback
        transition={{ type: "spring", stiffness: 300 }}
      />
      <Title
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        RubikBMT Academy
      </Title>
    </LeftSection>
    <UserSection>
      <span
        className="welcome-text"
        style={{ marginRight: 8, color: colors.primary }}
      >
        Welcome, {userInfo.name}
      </span>
      <Dropdown menu={userMenu} trigger={["click"]}>
        <StyledAvatar
          size={{ xs: 32, sm: 40 }}
          icon={<UserOutlined />}
          src={userInfo.avatar}
        >
          <DownOutlined style={{ fontSize: 12, marginLeft: 4 }} />
        </StyledAvatar>
      </Dropdown>
    </UserSection>
  </StyledHeader>
);

export default HeaderSection;
